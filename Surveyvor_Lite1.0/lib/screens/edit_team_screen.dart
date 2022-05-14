import 'dart:convert';
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:surveyvor_lite/models/team_model.dart';
import 'package:surveyvor_lite/screens/survey_list_screen.dart';
import 'package:surveyvor_lite/screens/team_list_screen.dart';
import 'package:surveyvor_lite/utilities/globals.dart' as globals;
import 'package:flutter_colorpicker/flutter_colorpicker.dart';

import 'package:flutter/services.dart';
import 'package:surveyvor_lite/models/survey_model.dart';
import 'package:surveyvor_lite/screens/navbar.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:surveyvor_lite/utilities/constants.dart';

class EditTeamScreen extends StatefulWidget {
  String team_id;
  EditTeamScreen(this.team_id);
  @override
  _EditTeamScreenState createState() => _EditTeamScreenState(team_id);
}

class _EditTeamScreenState extends State<EditTeamScreen> {
  TextEditingController teamNameController = new TextEditingController();
  TextEditingController teamDescriptionController = new TextEditingController();

  String team_id;
  _EditTeamScreenState(this.team_id);

  loadSurvey() async{

    http.Response response = await http.get(
      Uri.parse('https://surveyvor.shocklogic.com/api/team/all/'+team_id),
      headers: {
        "Content-Type": "application/json",
        "Authorization":globals.token
      },
    );

    var data = jsonDecode(response.body);
    var s = data["team"];
    Team team=new Team(s["team_id"].toString(), s["user_id"].toString(),  s["team_name"].toString(), s["team_description"].toString(), s["team_url_invitation"].toString());

    teamNameController.text = team.team_name;
    teamDescriptionController.text = team.team_description;

  }

  Widget _buildSaveBtn() {
    return Container(
      margin: const EdgeInsets.only(top: 10.0),
      padding: EdgeInsets.symmetric(vertical: 25.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () => {updateSurvey()},
        padding: EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30.0),
        ),
        color: Colors.white,
        child: Text(
          'SAVE',
          style: TextStyle(
            color: Color(0xFF527DAA),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
      ),
    );
  }

  Widget _buildTeamNameTF() {

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          'Team Name',
          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: TextField(
            controller: teamNameController,
            keyboardType: TextInputType.text,
            style: TextStyle(
              color: Colors.white,
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: EdgeInsets.only(top: 14.0),
              prefixIcon: Icon(
                Icons.edit,
                color: Colors.white,
              ),
              hintText: 'Enter your Team Name',
              hintStyle: kHintTextStyle,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildDescriptionTF() {

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(height: 30.0),
        Text(
          'Team Description',

          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: TextField(
            controller: teamDescriptionController,
            keyboardType: TextInputType.text,

            style: TextStyle(
              color: Colors.white,
              fontFamily: 'OpenSans',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: EdgeInsets.only(top: 14.0),
              prefixIcon: Icon(
                Icons.edit,
                color: Colors.white,
              ),
              hintText: 'Enter your Team Description',

              hintStyle: kHintTextStyle,
            ),
          ),
        ),
      ],
    );
  }



  updateSurvey() async{
    String name = teamNameController.text;
    String desc = teamDescriptionController.text;
    String text = "Error";

    if(name.isEmpty ||
        desc.isEmpty){
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text("Whoops! there are missing fields"),
      ));
      return;
    }


    http.Response response = await http.post(
      Uri.parse('https://surveyvor.shocklogic.com/api/team/update/'+team_id),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization":globals.token
      },
      body: jsonEncode(<String, String>{
        'team_name': name,
        'team_description': desc,
      }),
    );

    if(response.statusCode == 200 || response.statusCode == 201){
      text = "Successfully updated!";
    }else{
      text = "Whoops, something went wrong";
    }

    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text(text),
    ));

    Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => TeamListScreen()));
  }

  @override
  Widget build(BuildContext context) {
    loadSurvey();
    return Scaffold(
      appBar: AppBar(
        title: const Text('Edit Team'),
      ),
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle.light,
        child: Stack(
          children: <Widget>[
            Container(
              height: double.infinity,
              width: double.infinity,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Color(0xFF73AEF5),
                    Color(0xFF61A4F1),
                    Color(0xFF478DE0),
                    Color(0xFF398AE5),
                  ],
                  stops: [0.1, 0.4, 0.7, 0.9],
                ),
              ),
            ),
            Container(
              height: double.infinity,
              child: SingleChildScrollView(
                physics: AlwaysScrollableScrollPhysics(),
                padding: EdgeInsets.symmetric(
                  horizontal: 50.0,
                  vertical: 40.0,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[

                    Container(
                      child: Image(
                        image: NetworkImage('https://raw.githubusercontent.com/devck84/surveyvor/master/epstmlgv1.png'),
                        height: 225.0,

                      ),
                    ),
                    SizedBox(height: 30.0),
                    _buildTeamNameTF(),
                    _buildDescriptionTF(),
                    _buildSaveBtn(),
                    //   _buildLoginBtn(),
                    //   _buildSignupBtn(),
                  ],
                ),
              ),
            )
          ],
        ),
      ),

    );
  }
}