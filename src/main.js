// import $, { data } from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import { Entry } from './entry.js'

function Entry(body, title) {
  this.body = body;
  this.title = title;
}

let today = new Entry ("Feb 28","this is the stuff that is the body of the journal entry lorem ipsum or what not.");