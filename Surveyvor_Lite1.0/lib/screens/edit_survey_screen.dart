import 'dart:convert';
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:surveyvor_lite/screens/survey_list_screen.dart';
import 'package:surveyvor_lite/utilities/globals.dart' as globals;
import 'package:flutter_colorpicker/flutter_colorpicker.dart';

import 'package:flutter/services.dart';
import 'package:surveyvor_lite/models/survey_model.dart';
import 'package:surveyvor_lite/screens/navbar.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:surveyvor_lite/utilities/constants.dart';

class EditSurveyScreen extends StatefulWidget {
  String survey_id;
  EditSurveyScreen(this.survey_id);
  @override
  _EditSurveyScreenState createState() => _EditSurveyScreenState(survey_id);
}

class _EditSurveyScreenState extends State<EditSurveyScreen> {
  List<String> items = <String>[];
  bool item = false;
  String _value='';
  TextEditingController surveyNameController = new TextEditingController();
  TextEditingController surveyDescriptionController = new TextEditingController();
  TextEditingController backgroundColorController = new TextEditingController();
  TextEditingController colorController = new TextEditingController();

  Color pickerBackgroundColor = Color(0xff443a49);
  Color currentBackgroundColor = Color(0xff443a49);

  Color pickerColor = Color(0xff443a49);
  Color currentColor = Color(0xff443a49);

  String survey_id;
  _EditSurveyScreenState(this.survey_id);

  loadSurvey() async{

    http.Response response = await http.get(
      Uri.parse('https://surveyvor.shocklogic.com/api/survey/mine/'+survey_id),
      headers: {
        "Content-Type": "application/json",
        "Authorization":globals.token
      },
    );

    var data = jsonDecode(response.body);
    var s = data["survey"];
    Survey survey=new Survey(s["survey_id"].toString(), s["team_id"].toString(),  s["privacy_id"].toString(), s["user_id"].toString(), s["survey_name"].toString(), s["survey_description"].toString(), s["button_color"].toString(),  s["background_color"].toString(),  s["date_created"].toString(),s["active"].toString());


    List<String> items = <String>[];

    http.Response responsePrivacy = await http.get(
      Uri.parse('https://surveyvor.shocklogic.com/api/privacy/all'),
      headers: {
        "Content-Type": "application/json",
        "Authorization":globals.token
      },
    );

    var dataPrivacy = jsonDecode(responsePrivacy.body);
    for(var p in dataPrivacy["privacy"]){
      items.add(p["privacy_id"].toString()+" - "+p["privacy_name"]);
    }

    if(_value==''){
      final index = items.indexWhere((element) =>
      element.split('')[0] == survey.privacy_id);
      setState(() {
        this.items = items;
        _value =  items[index];
        item = survey.active=='1'?true:false;
        pickerColor = Color(int.parse(survey.button_color.toString().split("#")[1], radix: 16));
        currentColor  = pickerColor;
        pickerBackgroundColor = Color(int.parse(survey.background_color.toString().split("#")[1], radix: 16));
        currentBackgroundColor = pickerBackgroundColor;
        surveyNameController.text = survey.survey_name;
        surveyDescriptionController.text = survey.survey_description;

      });
    }
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

  Widget _buildSurveyNameTF() {

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          'Survey Name',
          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: TextField(
            controller: surveyNameController,
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
              hintText: 'Enter your Survey Name',
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
          'Survey Description',

          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: TextField(
            controller: surveyDescriptionController,
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
              hintText: 'Enter your Survey Description',

              hintStyle: kHintTextStyle,
            ),
          ),
        ),
      ],
    );
  }
  Widget _buildPrivacyTF() {
    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(height: 30.0),
        Text(
          'Privacy',
          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          padding: EdgeInsets.fromLTRB(20, 0, 20, 0),

          child:

          DropdownButtonHideUnderline(


            child: DropdownButton(
              isExpanded: true,

              dropdownColor: Color(0xFF398AE5),
              value: _value,
              icon: const Icon(Icons.keyboard_arrow_down),
              // Array list of items
              items: items.map((String items) {
                return DropdownMenuItem(

                  value: items,
                  child: Text(

                    items,
                    style: const TextStyle(color: Colors.white),
                  ),
                );
              }).toList(),
              // After selecting the desired option,it will
              // change button value to selected value
              onChanged: (String? newValue) {
                setState(() {
                  _value = newValue??_value;
                });
              },
            ),
          ),
        ),
      ],
    );
  }
  Widget _buildBackGroundTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(height: 30.0),
        Text(
          'Background Color',
          style: kLabelStyle,
        ),
        SizedBox(height: 20.0),
        SingleChildScrollView(
          child:ColorPicker(
            enableAlpha: false,
            pickerAreaBorderRadius: BorderRadius.circular(150),
            colorPickerWidth: 300,
            displayThumbColor: false,
            pickerAreaHeightPercent: 0.3,
            pickerColor: pickerBackgroundColor,
            onColorChanged: (Color color)=>{setState((){
              pickerBackgroundColor = color;
              currentBackgroundColor = pickerBackgroundColor;
            })},
            hexInputController: backgroundColorController,
          ),)
      ],
    );
  }

  Widget _buildColorTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(height: 30.0),
        Text(
          'Buttons\' Color',
          style: kLabelStyle,
        ),
        SizedBox(height: 20.0),
        SingleChildScrollView(
          child:ColorPicker(
            enableAlpha: false,
            pickerAreaBorderRadius: BorderRadius.circular(150),
            colorPickerWidth: 300,
            displayThumbColor: false,
            pickerAreaHeightPercent: 0.3,
            pickerColor: pickerColor,
            onColorChanged: (Color color)=>{setState((){
              pickerColor = color;
              currentColor=pickerColor;
            })},
            hexInputController: colorController,
          ),)
      ],
    );
  }

  Widget _buildActiveTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(height: 30.0),
        Text(
          'Active',
          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.center,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: Switch(
            onChanged: (bool val)=>{
              setState((){
                item = val;
              })
            },
            value: item,
            activeColor: Colors.blue,
            activeTrackColor: Colors.blue,
            inactiveThumbColor: Colors.blueGrey,
            inactiveTrackColor: Colors.blueGrey,
          ),
        ),
      ],
    );


  }

  updateSurvey() async{
    String name = surveyNameController.text;
    String desc = surveyDescriptionController.text;
    String text = "Error";

    if(name.isEmpty ||
        desc.isEmpty){
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text("Whoops! there are missing fields"),
      ));
      return;
    }


    http.Response response = await http.post(
      Uri.parse('https://surveyvor.shocklogic.com/api/survey/update/'+survey_id),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization":globals.token
      },
      body: jsonEncode(<String, String>{
        'privacy_id': _value.split(" - ")[0],
        'survey_name': name,
        'survey_description': desc,
        'button_color': '#${pickerColor.value.toRadixString(16)}',
        'background_color': '#${pickerBackgroundColor.value.toRadixString(16)}',
        'active': item==true?'1':'0',
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
        MaterialPageRoute(builder: (context) => SurveyListScreen()));
  }

  @override
  Widget build(BuildContext context) {
    loadSurvey();
    return Scaffold(
      appBar: AppBar(
        title: const Text('Edit Survey'),
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
                      _buildSurveyNameTF(),
                  _buildDescriptionTF(),
                      _buildPrivacyTF(),
                      _buildBackGroundTF(),
                      _buildColorTF(),
                      _buildActiveTF(),
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