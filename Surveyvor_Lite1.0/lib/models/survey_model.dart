import 'package:flutter/material.dart';
class Survey {
  var survey_id, team_id, privacy_id, user_id, survey_name, survey_description, button_color, background_color, date_created, active;

  Survey(var survey_id,
      var team_id,
      var privacy_id,
      var user_id,
    var survey_name,
    var survey_description,
    var button_color,
    var background_color,
    var date_created,
      var active) {

      this.survey_id = survey_id;
      this.team_id = team_id;
      this.privacy_id = privacy_id;
      this.user_id = user_id;
      this.survey_name = survey_name;
      this.survey_description = survey_description;
      this.button_color = button_color;
      this.background_color = background_color;
      this.date_created = date_created;
      this.active = active;

  }
}