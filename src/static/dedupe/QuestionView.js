export default class QuestionView extends Component {
    constructor() {
        super();

        this.state = {
            currentCategory: null
        }

        // this makes me sad and is dumb
        this.onCategoryClick = this.onCategoryClick.bind(this);
    }
    onCategoryClick(currentCategory) {
        this.setState({ currentCategory })
    }

    render() {
        return (
            <div>
                <div id="header">
                    This div is the header lol check it out
                </div>

                <div id="sidebar">
                    <h3>this div is like the side bar where you can like, pick stuff</h3>
                    {/* <ul id="categories"></ul> */}
                    <Categories onClick={this.onCategoryClick} currentCategory={this.state.currentCategory} />
                </div>

                <div id="main-section">
                    <h3>results in this div. lol</h3>
                    {/* <div id="questions"></div> */}
                    <Questions currentCategory={this.state.currentCategory}/>
                </div>
            </div>
        )
    }
}
