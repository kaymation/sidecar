import json
from lxml import html


COMMENT_BLOCK_CLASS = 'UFICommentActorAndBody'

BLOCK_SELECTOR = '.' + COMMENT_BLOCK_CLASS


def create_parsed_comment_list(input_file):
    tree = html.parse(open(input_file))
    mapping = []

    # TODO more performance way of parsing with xpath and interators
    comment_blocks = [span for span in tree.findall("//span") if span.get('class') and 'UFICommentActorAndBody' in span.get('class')]
    for comment in comment_blocks:
        # Lucky us, the anchor elements will
        author = comment.find('.//a').text

        # This code is terrible
        text = comment.find('.//span[@class="UFICommentBody"]').text_content()

        parsed_comment = {'author': author, 'text': text}

        mapping.append(parsed_comment)

    return mapping


