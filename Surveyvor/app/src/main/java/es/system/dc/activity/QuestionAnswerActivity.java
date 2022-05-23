package es.system.dc.activity;

import android.content.Intent;
import android.graphics.Color;
import android.text.InputType;
import android.view.View;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.slider.RangeSlider;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import es.system.dc.R;
import es.system.dc.model.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QuestionAnswerActivity extends AppCompatActivity {
    Integer survey_id,question_index;
    TextView surveyTitle, questionTitle;
    Button saveQuest;
    String answer_text;
    Integer defined_answer_id = null;
    AnswerRaw answerRaw;
    Question questions;
    QuestionRaw currentQuest;
    LinearLayout linearLayout;
    DefinedAnswer definedAnswers;
    List<DefinedAnswerRaw> defAns = new ArrayList<>();
    SurveyRaw survey;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question_answer);
        Intent intent = getIntent();
        survey_id= intent.getIntExtra("survey_id",1);
        question_index = intent.getIntExtra("question_index",0);
        linearLayout = findViewById(R.id.answer_question_comp);
        surveyTitle = findViewById(R.id.survey_name_questanswer);
        questionTitle = findViewById(R.id.question_name_questanswer);
        saveQuest = findViewById(R.id.button_next_question);
        loadSurvey();
        loadQuestion();
    }

    public void loadQuestion(){
        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/question/all/"+survey_id;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        questions = gson.fromJson(res, Question.class);
                        currentQuest = questions.getQuestion().get(question_index);

                        questionTitle.setText(currentQuest.getQuestion_text());

                        loadTypeOfQuestion();
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(QuestionAnswerActivity.this, "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
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

    public void loadTypeOfQuestion(){
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(560, LinearLayout.LayoutParams.WRAP_CONTENT);
        params.topMargin = 20;

        switch(currentQuest.getQuestion_type_id()){
            case 1:
                EditText shortAnswer = new EditText(this);
                shortAnswer.setInputType(InputType.TYPE_TEXT_FLAG_MULTI_LINE);
                shortAnswer.setLayoutParams(params);
                linearLayout.addView(shortAnswer, 2);
                break;
            case 2:
                EditText longAnswer = new EditText(this);
                longAnswer.setLayoutParams(params);
                linearLayout.addView(longAnswer, 2);
                break;
            case 3:
                Spinner selection = new Spinner(this);
                selection.setLayoutParams(params);
                linearLayout.addView(selection, 2);
                loadDefinedAnswers();
                break;
            case 4:
                DatePicker dates = new DatePicker(this);
                dates.setLayoutParams(params);
                linearLayout.addView(dates, 2);
                break;
            case 5:
                RangeSlider ranges = new RangeSlider(this);
                ranges.setValueFrom(0);
                ranges.setValueTo(100);
                ranges.setLayoutParams(params);
                linearLayout.addView(ranges, 2);
                break;
            case 6:
                EditText emailAnswer = new EditText(this);
                emailAnswer.setInputType(InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS);
                emailAnswer.setLayoutParams(params);
                linearLayout.addView(emailAnswer, 2);
                break;
            case 7:
                EditText urlAnswer = new EditText(this);
                urlAnswer.setInputType(InputType.TYPE_TEXT_VARIATION_URI);
                urlAnswer.setLayoutParams(params);
                linearLayout.addView(urlAnswer, 2);
                break;
            case 8:
                EditText phoneAnswer = new EditText(this);
                phoneAnswer.setInputType(InputType.TYPE_CLASS_PHONE);
                phoneAnswer.setLayoutParams(params);
                linearLayout.addView(phoneAnswer, 2);
                break;
        }
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
                        SurveyCreated surveyc = gson.fromJson(res, SurveyCreated.class);
                        survey = surveyc.getSurvey();
                        surveyTitle.setText(survey.getSurvey_name());
                        linearLayout.setBackgroundColor(Color.parseColor(survey.getBackground_color()));
                        saveQuest.setBackgroundColor(Color.parseColor(survey.getButton_color()));
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(QuestionAnswerActivity.this, "Whoops! something went wrong", Toast.LENGTH_SHORT).show();

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

    public void loadDefinedAnswers(){
        Spinner dropdown = (Spinner) linearLayout.getChildAt(2);
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/definedAnswer/all/"+survey_id;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        definedAnswers = gson.fromJson(res, DefinedAnswer.class);
                        String[] items = new String[definedAnswers.getDefinedAnswers().size()];

                        for (int i=0; i<definedAnswers.getDefinedAnswers().size(); i++)
                        {
                            System.out.println(definedAnswers.getDefinedAnswers().get(i).getQuestion_id()+" "+currentQuest.getQuestion_id());
                            if(definedAnswers.getDefinedAnswers().get(i).getQuestion_id().equals(currentQuest.getQuestion_id())){
                                defAns.add(definedAnswers.getDefinedAnswers().get(i));

                            }

                        }
                        for (int i=0; i<defAns.size(); i++)
                        {
                            items[i] = defAns.get(i).getDefined_answer_text();
                        }
                        ArrayAdapter<String>adapter = new ArrayAdapter<String>(QuestionAnswerActivity.this,
                                android.R.layout.simple_spinner_item,items);

                        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                        dropdown.setAdapter(adapter);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(QuestionAnswerActivity.this, "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
            }
        });

        queue.add(stringRequest);
    }

    public void nextQuestion(View v){
        Intent intent = new Intent(QuestionAnswerActivity.this, QuestionAnswerActivity.class);
        if(question_index==questions.getQuestion().size()-1){
            intent = new Intent(QuestionAnswerActivity.this, ThankYouActivity.class);
        }

        saveLoad();


        intent.putExtra("survey_id", survey_id);
        intent.putExtra("question_index", question_index+1);
        startActivity(intent);
    }

    public void saveLoad(){
        answer_text="";
        defined_answer_id=null;
        switch (currentQuest.getQuestion_type_id()){
            case 1:
            case 2:
            case 6:
            case 7:
            case 8:
                EditText answerBox = (EditText) linearLayout.getChildAt(2);
                answer_text = answerBox.getText().toString();
                break;
            case 3:
                Spinner dropdown = (Spinner) linearLayout.getChildAt(2);
                answer_text = dropdown.getSelectedItem().toString();
                defined_answer_id = defAns.get(dropdown.getSelectedItemPosition()).getDefined_answer_id();
                break;
            case 4:
                DatePicker date = (DatePicker) linearLayout.getChildAt(2);
                int day = date.getDayOfMonth();
                int month = date.getMonth() + 1;
                int year = date.getYear();
                answer_text = day+"/"+month+"/"+year;
                break;
            case 5:
                RangeSlider range = (RangeSlider) linearLayout.getChildAt(2);
                answer_text = String.valueOf(range.getValueTo());
                break;
        }


        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/userAnswer/save";

        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(QuestionAnswerActivity.this, "Whoops! Something went wrong", Toast.LENGTH_SHORT).show();
            }
        }){

            protected Map<String, String> getParams(){
                Map<String, String> paramV = new HashMap<>();
                paramV.put("survey_id", String.valueOf(survey_id));
                paramV.put("question_id", String.valueOf(currentQuest.getQuestion_id()));
                if(defined_answer_id!=null){
                    paramV.put("defined_answer_id",String.valueOf(defined_answer_id));
                }

                paramV.put("survey_answer_text", answer_text);

                return paramV;
            }
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Authorization", token);
                return params;
            }

        };
        queue.add(stringRequest);
    }

}