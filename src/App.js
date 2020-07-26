import React, {Component} from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from './components/CreateContent';
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css';






//react에서는 props의 값이나 state의 값이 바뀌면 해당되는 컴퍼넌트의 render함수가 호출되도록
// 약속되있다. 그얘기는 props나 state가 바뀌면 화면이 다시 그려진다.

class App extends Component {
  //어떤 컴포넌트가 실행될떄 render라는 
  // 함수보다 먼저 실행되면서 그컴포넌트를 초기화 시켜주고 싶은 코드는 컨스트럭터를 짜고 안에 코드를 작성한다. 
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'create',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World wid Web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents: [
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interative'}
      ]
    }
  }
  render(){
    var _title, _desc,_article= null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>

    }else if (this.state.mode === 'read'){
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;  
      
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
      
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        //add content to this.state.contents
        // this.state.contents.push({id:this.max_content_id, title: _title, desc: _desc});
        this.max_content_id = this.max_content_id+1;
        var _contents = this.state.contents.concat({id:this.max_content_id, title: _title, desc:_desc})
        this.setState({contents: _contents});
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    }
  return (
    <div className="App">
      <Subject title={this.state.subject.title} sub={this.state.subject.sub}
       onChangePage={function(){
         this.setState({
           mode: 'welcome'
         });
      }.bind(this)}></Subject>
      
      <TOC onChangePage={function(id){
        this.setState({
          mode:'read',
          selected_content_id:Number(id)
        });
      }.bind(this)} 
      data={this.state.contents}></TOC>

      
      <Control onChangeMode={function(_mode){
        this.setState({
          mode: _mode
        })
      }.bind(this)}></Control>

      {_article}
    </div>
  );
}
}
export default App;
