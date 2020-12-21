import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

class app{
  static routerArr = [];

  static route(path, router){
    return app.routerArr.push({path, router});
  }

  static next(){
      for(let v of app.routerArr){
        if(window.location.pathname === v.path){
          v.router();
          return true;
        }
      }
      return false;
  }

  static router({route, err}){
    route();
    if(app.next()) return;
    else return err();
  }
}

app.router({
  route : function(){
    app.route('/pageTwo', pageTwo);
    app.route('/', mainPage);
  },
  err : errPage
});


function mainPage(){
  import './temp.html';
  import './main.html';
  
  Template.hello.onCreated(function helloOnCreated() {
    // counter starts at 0 --- Statement
    this.counter = new ReactiveVar(0);
  });
  
  Template.hello.helpers({
    counter() {
      return Template.instance().counter.get();
    },
  });
  
  Template.hello.events({
    'click button'(event, instance) {
      // increment the counter when button is clicked
      instance.counter.set(instance.counter.get() + 1);
    },
  });
  
  Template.myTemp.onCreated(function myTemp(){
    console.log(Template.body);
    console.log(Template.currentData);
    console.log(window.location.pathname);
    console.log("MyTEMP!");
  });
  
  Template.myTemp.helpers({
    hi(){
      console.log('HI!!!!')
      return "HI!!!!!";
    }
  });
  
  Template.myTemp.events({
    'click'(e, i){
      console.log('e',e);
      console.log("i",i);
    }
  });
  return;
};

function pageTwo(){
  import './pageTwo.html';
  return;
}

function errPage(){
  import './err.html';
  return;
}