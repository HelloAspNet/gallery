import React, {Component} from 'react';
import Q from 'q';

import Mod from './Mod';

class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      imageList: [],
      imageUrlList: []
    }
  }

  click() {
    if(this.refs.test){
      console.log(111)
    }
    else{
      console.log(222)
    }
  }

  dragOver(e){
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  drop(e){
    e.preventDefault();
    const files = e.dataTransfer.files;

    const fileList = Object.keys(files).map(i => files[i]);

    const promises = fileList.map(file => {
      const defer = Q.defer();
      const reader = new FileReader;
      reader.addEventListener('load', () => {
        const image = new Image;
        image.src = reader.result;
        image.alt = file.name;
        image.addEventListener('load', e => defer.resolve(image));
      });
      reader.readAsDataURL(file);
      return defer.promise;
    });

    console.log(11,files);

    Q.all(promises).then(([...imageList]) =>{

      this.state.imageList = imageList;

      this.state.imageUrlList = imageList.map((image, i) => <li key={i}>{image.alt}</li>);
      //
      //this.state.imageList = imageList.map((reader, i) => <img key={i} src={reader.result} alt=""/>);
      //
      const modList = imageList.map((image, i) => <Mod key={i} width={image.width} height={image.height} bgUrl={image.src} />);
      //
      this.props.updateModList(modList);

      console.log(imageList)


      //console.log(3,readers);

      this.setState(this.state);

      //this.refs.text = reader.result;
      //
      //defer.resolve(reader);
      //
      //this.state.url = reader.result;
      //this.setState(this.state)
    });

    e.stopPropagation();
    return false;
  }

  render() {
    return (
      <fieldset className="tools">
        <input type="button" id="init" value="init"/>
        <input type="button" id="built" value="built"/>
        <span onDragOver={this.dragOver.bind(this)} onDrop={this.drop.bind(this)}>这里这里</span>
        <input type="text" ref="text"/>
        <ul>{this.state.imageUrlList}</ul>
        <label><input type="checked" ref="test"/>Test</label>
      </fieldset>
    );
  }
}

export default Tools;