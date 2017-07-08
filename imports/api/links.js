import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    Meteor.publish('links', function () {
        return Links.find({ userId: this.userId });
    });
}

// Creating methods in both client and server to ensure db sync
Meteor.methods({
    // greetUser(name) {
    //     // Using ES5 function for access to this.  Since defining in an object 
    //     // can use ES6 syntax.  IOW 'greetUser()' instead of greetUser: function ().
    //     console.log('greetUser is running');

    //     if(!name) {
    //         throw new Meteor.Error('invalid-arguments', 'Name is required');
    //     }

    //     return `Hello ${name}`;
    // },

    // addNumbers(x, y) {
    //     if(typeof x === 'number' && typeof y === 'number') {
    //         return x + y;
    //     }
    //     throw new Meteor.Error('invalid-arguments', 'Both arguments must be numbers.');
    // }

    // Usins quotes to allow for '.' in name 'links.insert'
    'links.insert'(url) {
        // make sure user is logged in
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            url: {
                type: String,
                label: 'Your link',
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });

        Links.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId,
            visible: true,
            visited: 0,
            lastVisitedAt: null
        });
    },

    'links.setVisibility'(_id, visible) {
        // make sure user is logged in
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            visible: {
                type: Boolean
            }
        }).validate({_id, visible });

        Links.update({_id, userId: this.userId }, { $set: {visible: visible} } );

    },

    'links.trackVisit'(_id) {
      new SimpleSchema({
        _id: {
          type: String,
          min: 1
        },
      }).validate({ _id });

      Links.update({ _id }, { 
        $set: {
          lastVisitedAt: new Date().getTime()
        },
        $inc: {
          visited: 1
        }
      });
    }
});

//challenge:
//addNumbers takes 2 numbers as arguments user typeof to make sure they're numbers
//typeof 3 === 'number'
// if one or both are not number throw an error
// return a + b