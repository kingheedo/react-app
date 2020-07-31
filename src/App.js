import React, {Component} from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from './components/CreateContent';
import UpdateContent from "./components/UpdateContent";
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
      mode:'welcome',
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
  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data;
          break;
        }
        i = i + 1;  
      }
  }
  getContent(){
    var _title, _desc,_article= null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>

    }else if (this.state.mode === 'read'){

    var _content = this.getReadContent();
      _article = <ReadContent title={_content._title} desc={_content._desc}></ReadContent>
      
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        //add content to this.state.contents
        this.max_content_id = this.max_content_id+1;
        // this.state.contents.push({id:this.max_content_id, title: _title, desc: _desc});
        
        // var _contents = this.state.contents.concat({id:this.max_content_id, title: _title, desc:_desc})
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id,
        title:_title, desc: _desc});
        this.setState({
          contents: newContents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    }else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
        //add content to this.state.contents
       
        var _contents =  Array.from(this.state.contents);
       var i =0;
       while(i < _contents.length){
        if(_contents[i].id === _id){
          _contents[i] = {id:_id, title: _title, desc:_desc};
          break;
        }
        i= i+1;
       }
       this.setState({
        contents: _contents,
        mode:'read'
      });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render(){
    
  return (
    <div className="App">
      <Subject title={this.state.subject.title} 
      sub={this.state.subject.sub}
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
        if(_mode === 'delete'){
          if(window.confirm("really?")){
            var _contents = Array.from(this.state.contents);
            var i  = 0;
            while(i< _contents.length){
              if(_contents[i].id === this.state.selected_content_id){
                _contents.splice(i,1);
                break;
              }
              i = i + 1;
            }
            this.setState({
              mode:'welcome',
              contents: _contents
            });
            alert("deleted!");
          }
        }else{
          this.setState({
            mode: _mode
          });
        }
        
      }.bind(this)}></Control>

      {this.getContent()}
    </div>
  );
}
}
export default App;
