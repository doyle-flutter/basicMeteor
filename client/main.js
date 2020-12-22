import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// (2) Blaze Router
// > meteor add ostrio:flow-router-extra
// > meteor add kadira:blaze-layout
// (https://guide.meteor.com/routing.html#server-side)

import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/lists', {
  name: 'ListsMain',
  action(params, queryParams) {
    // example
    console.log("Looking at a list?");
    console.log(params);
    console.log(queryParams);
    
    // import './listsPage/listsMain.html'
    // or BlazeLayout
    import lists from './listsPage/listsTem.html';
    Template.lists.onCreated(function(){
      console.log('listsCreate');
    })
    return BlazeLayout.render('lists',{title: "MyBlaze Temp"});
  },
});
FlowRouter.route('/lists/:_id', {
  name: 'ListsMain',
  action(params, queryParams) {
    console.log("Looking at a list?");
    console.log(params);
    console.log(queryParams);
    import lists from './listsPage/listsTem.html';
    Template.lists.onCreated(function(){
      console.log('listsCreate2');
    })
    return BlazeLayout.render('lists',{title: params._id+queryParams.value});
  }
});

// (1) Custom Router
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
    app.route('/reactMain', reactMain);
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

function reactMain(){
  import './react/reactMain.html';
  return;
}