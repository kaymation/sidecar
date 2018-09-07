import json
import urllib
import os
from elasticsearch import Elasticsearch, TransportError

es = Elasticsearch(
    # hosts=[{ 'host': os.environ.get('ELASTIC_HOST', 'localhost'), 'port': 9200 }]
)


CREATE_INDEX_QUERY = {
    "mappings": {
        "debate": {
            "properties": {
                "title": {
                    "type": "text",
                    "analyzer" : "keyword"
                },
                "questions": {
                    "type": "nested",
                    "properties": {
                        "text": {
                            "type": "text",
                            "store" : True,
                            "analyzer" : "english"
                        },
                            "author": {
                            "type": "text",
                            "analyzer" : "english"
                        }
                    }
                }
            }
        }
    },
    "settings" : {
        "index" : {
            "number_of_shards" : 1,
            "number_of_replicas" : 0
        }
    }
}

TERMVECQUERY = {
    "fields" : ["questions.text"],
    "offsets" : True,
    "payloads" : True,
    "term_statistics" : True,
    "field_statistics" : True,
    "filter" : {
        "min_term_freq" : 1,
        "min_doc_freq" : 1,
        "min_word_length": 3
    },
    "per_field_analyzer" : {
        "questions.text": "english"
    }
}

def create_index():
    try:
        es.search(index='debates')
    except TransportError:
        es.indices.create('debates', body=CREATE_INDEX_QUERY)


def question_list_query(debate, category):
    nested_query = {"match_all": {}}

    if category is not None:
        nested_query = {
            "nested": {
                "path": "questions",
                    "query": {
                        "bool": {
                        "must": [
                            {
                                "match": {
                                    "questions.text": category
                                }
                            }
                        ]
                    }
                },
                "inner_hits": { 'size': 100 }
            }
        }

    return {
        "query": {
            "bool": {
                "must": [
                    nested_query,
                    { "match": { "title": debate } }
                ]
            }
        }
    }


def upload_questions_query(debate_name, questions):

    body = {
        "title": debate_name,
        "questions": questions
    }

    return es.index(index='debates', doc_type='debate', id=urllib.quote(debate_name), body=body)

def query_debates():
    ids_query = {
        "query" : {
            "match_all" : {}
        },
        "stored_fields": []
    }
    try:
        results = es.search(index='debates', body=ids_query)
    except:
        return []

    return [urllib.unquote(result['_id']) for result in results['hits']['hits']]

def query_questions(debate, category=None):
    query_body = question_list_query(debate, category)

    result = es.search(index='debates', body=query_body)

    if category:
        raw_results = result['hits']['hits'][0]['inner_hits']['questions']['hits']['hits']
        result_generator = (result['_source'] for result in raw_results)
    else:
        raw_results = result['hits']['hits'][0]['_source']['questions']
        result_generator = (result for result in raw_results)

    return [ {'author': question['author'], 'text': question['text']} for question in result_generator]

def query_categories(debate):
    result = es.termvectors(index='debates', doc_type='debate', id=urllib.quote(debate), body=TERMVECQUERY)

    serialized_results = [{'category': key, 'count': value['term_freq']} for key, value in result['term_vectors']['questions.text']['terms'].iteritems()]

    def sort_method(result):
        return (len(result['category']), result['count'])

    serialized_results.sort(key=sort_method, reverse=True)

    return serialized_results
