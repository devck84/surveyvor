import 'package:flutter/material.dart';
class Team {
  var team_id, user_id, team_name, team_description, team_url_invitation;

  Team(
      var team_id,
      var user_id,
      var team_name,
      var team_description,
      var team_url_invitation) {

    this.team_id = team_id;
    this.user_id = user_id;
    this.team_name = team_name;
    this.team_description = team_description;
    this.team_url_invitation = team_url_invitation;
  }
}