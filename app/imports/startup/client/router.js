import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { $ } from 'meteor/jquery';

FlowRouter.route('/', {
  name: 'Landing_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Landing_Page' });
  },
});

// Item routes
/*
FlowRouter.route('/item/:_id', {
  name: 'Item_Page/',
  action() {
    BlazeLayout.render('App_Body', { main: 'Item_Page' });
  },
});
*/

FlowRouter.route('/beach/:_id', {
  name: 'Beach_Page/',
  action() {
    BlazeLayout.render('App_Body', { main: 'Beach_Page' });
  },
});

FlowRouter.route('/hike/:_id', {
  name: 'Hike_Page/',
  action() {
    BlazeLayout.render('App_Body', { main: 'Hike_Page' });
  },
});

FlowRouter.route('/restaurant/:_id', {
  name: 'Restaurant_Page/',
  action() {
    BlazeLayout.render('App_Body', { main: 'Restaurant_Page' });
  },
});



FlowRouter.route('/item-feed', {
  name: 'Item_Feed_Page',
  action() {
    BlazeLayout.render('Items_Layout', { main: 'Item_Feed_Page' });
  },
});

FlowRouter.route('/create-item', {
  name: 'Create_Item_Page',
  action() {
    BlazeLayout.render('Create_Item_Page');
  },
});

FlowRouter.route('/create-profile', {
  name: 'Create_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Create_Profile_Page' });
  },
});

FlowRouter.route('/edit-profile', {
  name: 'Edit_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Profile_Page' });
  },
});



function addUserBodyClass() {
  $('body').addClass('user-layout-body');
}

function removeUserBodyClass() {
  $('body').removeClass('user-layout-body');
}

const userRoutes = FlowRouter.group({
  prefix: '/:username',
  name: 'userRoutes',
  //triggersEnter: [addUserBodyClass],
  //triggersExit: [removeUserBodyClass],
});

export const profilePageRouteName = 'Profile_Page';
userRoutes.route('/profile', {
  name: profilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: profilePageRouteName });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};

/* ORIGINAL EXAMPLES


FlowRouter.route('/list', {
  name: 'List_Stuff_Page',

//Item routes
FlowRouter.route('/item', {
  name: 'Item_Page',
>>>>>>> issue-1
  action() {
    BlazeLayout.render('App_Body', { main: 'Item_Page' });
  },
});

FlowRouter.route('/item-feed', {
  name: 'Item_Feed_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Item_Feed_Page' });
  },
});

FlowRouter.route('/create-item', {
  name: 'Create_Item_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Create_Item_Page' });
  },
});


FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
*/


/* ORIGINAL EXAMPLES

>>>>>>> issue-2
 FlowRouter.route('/list', {
 name: 'List_Stuff_Page',
 action() {
 BlazeLayout.render('App_Body', { main: 'List_Stuff_Page' });
 },
 });
 FlowRouter.route('/add', {
 name: 'Add_Stuff_Page',
 action() {
 BlazeLayout.render('App_Body', { main: 'Add_Stuff_Page' });
 },
 });
 FlowRouter.route('/stuff/:_id', {
 name: 'Edit_Stuff_Page',
 action() {
 BlazeLayout.render('App_Body', { main: 'Edit_Stuff_Page' });
 },
 });
 FlowRouter.notFound = {
 action() {
 BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
 },
 };

 */

