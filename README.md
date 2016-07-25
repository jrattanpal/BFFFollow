# BFFFollow
BFF Follow allows users to follow their friends. Users can select their followed friends to see their feed.

The idea is to allow users to follow 5 of the top friends they want to follow and see their feed. Currently, in chatter, users' feed can show all of the followed users (friends) and it's hard to see friend specific feed.

## Synopsis
Users can use a User Lookup field to select Friend and follow her. Followed friends will show up in a drop down in "Feed" tab. Selecting a friend in Feed tab will use ConnectApi.ChatterFeeds.getFeedElementsFromFeed() to fetch a feed for a user and return it to component.
 
Component uses SLDS and it's Feed component (https://www.lightningdesignsystem.com/components/feeds/) to style the feed and display to user.


## Installation
You can use App exchange listing to install the managed package. Or you can use following Deploy button to deploy this code to a salesforce org.

<a href="https://githubsfdeploy.herokuapp.com?owner=jrattanpal&repo=BFFFollow">
  <img alt="Deploy to Salesforce" src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>


## Usage ##
There are 2 ways to use this component. 

1) You can use App Builder to add this component to a Lightning Page and/or tab. Or you can use latest App Builder feature to edit LEX home/record page and add the component there.

2) You can also use this component programmatically and add it to your other components; as needed.

<BSSFollow:BSSFollow debug="false" maxFollowedUsers="maxFollowedUsers" />

>



## Technical Details ##
Events:
1. COMPONENT: **UpdateLookId** (Lightning-Lookup)
2. COMPONENT: **ClearLookId** (Lightning-Lookup)
3. APPLICATION: **BFFFollow_UsersUpdated**
- Fired when new friends are followed or user removed old followed friend
- Idea is to update JSON list of followed friends in BFFHelper which, in turn, will pass that data to other components

Components:
1. **BFFFollow**
- Global Attributes
---- debug: true/false: If true then display log with console.log or System.debug (in Apex)
---- maxFollowedUsers: Number: Restricts users to follow only upto specified number of users
- How it works
---- BFFFollow will fire a fetch event to retrieve list of followed friends for current user
---- If no friends are followed then current user will be advised to follow one/more friends
---- This component has 3 tabs which include 3 components
---- First tab, **BFFFollow**_Feed, 
-------- Shows a drop down of followed friends. If a friend is selected then their feed will be fetched.
-------- If No friends are followed then a message will be displayed asking user to add one/more friends
---- Second tab, **BFFFollow_Users**,
-------- Has a lookup field to search for users
-------- Once a user has been searched, it will allow user to select that user as friend and add it to their followed users
-------- After friend has been followed, a new JSON will be generated and an event fired
-------- BFFFollow will catch that event and update followedUsers attribute. which will then traverse down to other components in tabs and update their drop downs etc
---- Third tab, **BFFFollow_UsersRemove**,
-------- Displays list of followed friends as Drop down
-------- User can select a friend and decide to remove that user from the list
-------- After successful removal, component will fire event to let other components know about updated list and refresh other components

## Technical Specifications ##
<img alt="BFFFollow - Diagram" src="resources/BFFFollow_Diagram.png" /

## Credits
Following are some of the component/libraries that I have used in this component. 

1. ETLC_ApexBridge
1.1 https://eltoro.secure.force.com/ETLC_ApexBridge
1.2 http://github.com/eltoroit/ETLC_ApexBridge

2. Lookup
2.1 https://developer.salesforce.com/blogs/developer-relations/2015/06/salesforce-lightning-inputlookup-missing-component.html
2.2 https://github.com/tscottdev/Lightning-Lookup



## About Me
I, Jaswinder Rattanpal,  love to work on new things. This time, I tried my hands at creating a new Lightning Component to publish on App Exchange.

I am also an Associate Technical Evangelist working with ISV Technical Evangelists team @Salesforce.

Don't forget to visit my blog: http://www.rattanpal.com