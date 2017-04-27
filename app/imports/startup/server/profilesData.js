import { Profiles } from '../../api/profiles/ProfileCollection.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Profiles Collection.
 * @type {*[]}
 */
const profileSeeds = [
  {
    username: 'rao642',
    first: 'Russell',
    last: 'Omo',
    standing: 'Junior',
    image: 'http://cdn.eluniversal.com/2014/10/29/hideaki-anno-el-anime-no-.jpg',
    about: 'I am a third year Computer Science Major and other than exploring hawaii, I enjoy programming.',
  },
  {
    username: 'cepugh',
    first: 'Chaselyn',
    last: 'Pugh',
    standing: 'Junior',
    image: '',
    about: 'I am a third year Computer Science Major and other than exploring hawaii, I enjoy programming.',
  },
];

if (Profiles.find().count() === 0) {
  _.each(profileSeeds, function seedProfiles(profile) {
    Profiles.insert(profile);
  });
}
