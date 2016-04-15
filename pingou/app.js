import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ES6Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import co from 'co';
import Q from 'q';
import 'babel-polyfill';

ES6Promise.polyfill();


import Tools from './components/Tools';
import Preview from './components/Preview';
import Link from './components/Link';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productLinkList: []
    };

    this.linkTemp = null;

  }



  updateModList(modList){
    console.log(1,modList)
    this.state.modList = modList;
    this.setState(this.state);
  }



  onLinkSelect(link){
    this.linkTemp = link;
  }

  /**
   *
   * 1. new and cache Link
   * 2. trigger cacheLink.update
   * 3. clear cacheLink
   *
   */

  dragBegin(e) {
    const {clientX, clientY} = e;
    const {scrollX, scrollY} = window;

    this.state.productLinkList.push(<Link key={+new Date} top={clientY + scrollY} left={clientX + scrollX} onSelect={this.onLinkSelect.bind(this)}/>);
    this.setState(this.state);

    //console.log(`begin with point x: ${clientX}, y: ${clientY}`);
  }

  draging(e) {

    if(!this.linkTemp) return;

    const {clientX, clientY} = e;
    const {scrollX, scrollY} = window;

    this.linkTemp.update({
      x: clientX + scrollX,
      y: clientY + scrollY
    });

    //console.log(`move with point x: ${clientX}, y: ${clientY}`);

  }

  dragEnd(e) {
    const {clientX, clientY} = e;
    this.linkTemp = null;
    //console.log(`end with point x: ${clientX}, y: ${clientY}`);
  }

  render() {
    return (
      <div className="kmods" onMouseDown={this.dragBegin.bind(this)} onMouseMove={this.draging.bind(this)}
           onMouseUp={this.dragEnd.bind(this)}>
        <Tools updateModList={this.updateModList.bind(this)}/>
        <div className="kmod-bgs">{this.state.modList}</div>
        <div className="kmod-plinks">{this.state.productLinkList}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

