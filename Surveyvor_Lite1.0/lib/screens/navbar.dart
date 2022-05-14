import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:surveyvor_lite/screens/friend_list_screen.dart';
import 'package:surveyvor_lite/screens/team_list_screen.dart';
import 'survey_list_screen.dart';

class NavBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        // Remove padding
        padding: EdgeInsets.zero,
        children: [
          UserAccountsDrawerHeader(
            accountName: Text('Surveyvor'),
            accountEmail: Text('Survey \'em all'),
            currentAccountPicture: CircleAvatar(
              child: ClipOval(
                child: Image.network(
                  'https://raw.githubusercontent.com/devck84/surveyvor/master/epstmlgv1.png',
                  fit: BoxFit.cover,
                  width: 90,
                  height: 90,
                ),
              ),
            ),
            decoration: BoxDecoration(
              color: Colors.blue,
              image: DecorationImage(
                  fit: BoxFit.fill,
                  image: NetworkImage(
                      'https://oflutter.com/wp-content/uploads/2021/02/profile-bg3.jpg')),
            ),
          ),
          ListTile(
            leading: Icon(Icons.bookmark),
            title: Text('Surveys'),
            onTap: () => {Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => SurveyListScreen()))
              },
          ),
          ListTile(
            leading: Icon(Icons.person),
            title: Text('Friends'),
            onTap: () => {Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => FriendListScreen()))},
          ),
          ListTile(
            leading: Icon(Icons.group_outlined),
            title: Text('Teams'),
            onTap: () => {Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => TeamListScreen()))},
          ),

          Divider(),
          ListTile(
            title: Text('Exit'),
            leading: Icon(Icons.exit_to_app),
            onTap: () => {SystemNavigator.pop()},
          ),
        ],
      ),
    );
  }
}