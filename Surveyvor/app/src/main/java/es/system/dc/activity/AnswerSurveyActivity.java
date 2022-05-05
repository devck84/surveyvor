package es.system.dc.activity;

import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.view.View;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import es.system.dc.R;
import es.system.dc.model.Country;
import es.system.dc.model.Survey;
import es.system.dc.model.SurveyCreated;
import es.system.dc.model.TokenApp;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AnswerSurveyActivity extends AppCompatActivity {
    TextView title, description;
    Integer survey_id;
    SurveyCreated survey;
    LinearLayout linearLayout;
    Button btnStart;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_answer_survey);
        title = findViewById(R.id.survey_name_answer);
        description = findViewById(R.id.survey_description_answer);
        linearLayout = findViewById(R.id.layoutSurveyAnswer);
        btnStart = findViewById(R.id.buttonStartSurvey);

        Intent intent = getIntent();
        Uri data = intent.getData();
        try {
            survey_id = Integer.parseInt(data.getPath().split("survey/")[1]);
        } catch (NumberFormatException nfe) {
            Toast.makeText(AnswerSurveyActivity.this, "Whoops! It looks like a wrong link", Toast.LENGTH_SHORT).show();
        }
        loadSurvey();
    }

    public void loadSurvey(){
        String token = TokenApp.getTOKEN();
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/survey/all/"+survey_id;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        survey = gson.fromJson(res, SurveyCreated.class);
                        title.setText(survey.getSurvey().getSurvey_name());
                        description.setText(survey.getSurvey().getSurvey_description());
                        linearLayout.setBackgroundColor(Color.parseColor(survey.getSurvey().getBackground_color()));
                        btnStart.setBackgroundColor(Color.parseColor(survey.getSurvey().getButton_color()));
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                if(error.networkResponse.statusCode==400){
                    System.out.println(error.networkResponse.toString());
                    Toast.makeText(AnswerSurveyActivity.this, "Whoops! this survey is not accessible", Toast.LENGTH_SHORT).show();
                }else if(error.networkResponse.statusCode==401){
                    System.out.println(error.networkResponse.toString());
                    Toast.makeText(AnswerSurveyActivity.this, "Whoops! try to log in first", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(AnswerSurveyActivity.this, MainActivity.class);
                    startActivity(intent);
                }

                System.out.println(error.networkResponse.toString());
                Toast.makeText(AnswerSurveyActivity.this, "Whoops! something went wrong", Toast.LENGTH_SHORT).show();

            }
        }){
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Authorization", token);
                return params;
            }
        };

        queue.add(stringRequest);
    }

    public void startSurvey(View v){
        Intent intent = new Intent(AnswerSurveyActivity.this, QuestionAnswerActivity.class);
        intent.putExtra("survey_id",survey_id);
        intent.putExtra("survey_name",survey.getSurvey().getSurvey_name());
        startActivity(intent);
    }
}