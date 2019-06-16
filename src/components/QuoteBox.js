import React from 'react';
import { ajaxRequest } from '../utils/ajax';

class QuoteBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            allData: []
        }
        this.getNewQuote = this.getNewQuote.bind(this);
        this.getQuotes = this.getQuotes.bind(this);
        this.didDataArrive = false;
        this.counter = 0;
        this.randomNumber = Math.floor(Math.random() * 101);
        this.firstTime = true;
        this.currentQuote = null;
        this.currentAuthor = null;
    }

    getNewQuote(e) {
        e.preventDefault();
        if (!this.firstTime) {
            this.counter++;
            this.setState({
                quotes: [...this.state.quotes]
            })
        } 
        if (this.counter === 0 && this.firstTime || this.counter === this.state.quotes.length) {
            this.counter = 0;
            this.firstTime = false;
            this.setState({
                quotes: [...this.state.allData[0]]
            })
        }
    }

    getQuotes(quotesResponse) {
        this.didDataArrive = true;
        this.setState({
            quotes: [...this.state.quotes, quotesResponse.quotes[this.randomNumber]],
            allData: [...this.state.allData, quotesResponse.quotes]
        });

        this.currentQuote = this.state.quotes[0].quote;
        this.currentAuthor = this.state.quotes[0].author;

        document.getElementById('tweet-quote').href = 'https://twitter.com/intent/tweet?related=freecodecamp&text=' + '"' + this.currentQuote + '" ' + '- ' + this.currentAuthor;
    }

    componentDidMount() {
        ajaxRequest('GET', 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', this.getQuotes);   
    }

    render() {
        if (!this.firstTime) {
            this.currentQuote = this.state.quotes[this.counter].quote;
            this.currentAuthor = this.state.quotes[this.counter].author;
            document.getElementById('tweet-quote').href = 'https://twitter.com/intent/tweet?related=freecodecamp&text=' + '"' + this.currentQuote + '" ' + '- ' + this.currentAuthor;
        }
        return(
            <div className="wrapper-box">
                <div id="quote-box">
                    <div className="wrapper-quote">
                        <p id="text">
                            {this.didDataArrive && '\"' + this.state.quotes[this.counter].quote + '\"'}
                        </p>
                        <span id="author">
                            {this.didDataArrive && '\"' + this.state.quotes[this.counter].author + '\"'}
                        </span>
                    </div>
                    <div className="wrapper-buttons">
                        <div className="options">
                            <a className="btn" id="tweet-quote" target="_blank">Tweet quote</a>
                        </div>
                        <div className="wrapper-new-text">
                            <a className="btn" id="new-quote" href="#" onClick={this.getNewQuote}>New Quote</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default QuoteBox;