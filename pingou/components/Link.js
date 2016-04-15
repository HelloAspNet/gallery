import React, {Component} from 'react';

 
class Link extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      top: 1,
      left: 0,
      width: 0,
      height: 0,
      link: 'javascript:;',
      target: '_self',
      text: ''
    }, props);

    this.onSelect();
  }

  onSelect(){
    this.props.onSelect(this);
  }

  update(point){

    const props = this.props;

    const pointXs = [props.left, point.x];
    const pointYs = [props.top, point.y];

    pointXs.sort((a, b) => a - b);
    pointYs.sort((a, b) => a - b);


    Object.assign(this.state, {
      top: pointYs[0],
      left: pointXs[0],
      width: pointXs[1] - pointXs[0],
      height: pointYs[1] - pointYs[0]
    });

    this.setState(this.state);
  }

  render() {
    return (
      <span className="kmod-link" href={this.state.link} target={this.state.target}
            style={{
              top: this.state.top,
              left: this.state.left,
              width: this.state.width,
              height: this.state.height
            }}>{this.state.text}</span>
    );
  }
}

export default Link;