import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Landing_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Landing_Page' });
  },
});

FlowRouter.route('/admin', {
  name: 'Admin_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Admin_Page' });
  },
});

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
    BlazeLayout.render('Item_Feed_Page', { main: 'Item_Feed_Page' });
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

FlowRouter.route('/edit-beach/:_id', {
  name: 'Edit_Beach_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Beach_Page' });
  },
});

FlowRouter.route('/edit-hike/:_id', {
  name: 'Edit_Hike_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Hike_Page' });
  },
});

FlowRouter.route('/edit-restaurant/:_id', {
  name: 'Edit_Restaurant_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Restaurant_Page' });
  },
});

FlowRouter.route('/edit-profile/:_id', {
  name: 'Edit_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Profile_Page' });
  },
});

FlowRouter.route('/p-profile', {
  name: 'Public_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Public_Profile_Page' });
  },
});
//
// function addUserBodyClass() {
//   $('body').addClass('user-layout-body');
// }
//
// function removeUserBodyClass() {
//   $('body').removeClass('user-layout-body');
// }

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

