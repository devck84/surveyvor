package es.system.dc.activity;

import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Color;
import android.graphics.Typeface;
import android.text.InputType;
import android.text.TextUtils;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.View;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import androidx.cardview.widget.CardView;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.content.ContextCompat;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.resources.TextAppearance;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import es.system.dc.R;
import es.system.dc.model.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QuestionMakerActivity extends AppCompatActivity {
    LinearLayout linearLayout;
    QuestionRaw question = new QuestionRaw();
    TextView title_question_comp;
    EditText questionText, sequenceNumber;
    Integer cant;
    Spinner dropdown;
    Switch requiredSwitch;
    QuestionCreated questionCreated;
    Button addDef;
    QuestionType questionType;
    List<DefinedAnswerRaw> definedAnswers = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question_maker);
        questionText = findViewById(R.id.question_text_maker);
        sequenceNumber = findViewById(R.id.sequence_number_maker);
        requiredSwitch = findViewById(R.id.switch_required_maker);

        linearLayout = findViewById(R.id.questions_comp);
        addDef = findViewById(R.id.add_answer);
        addDef.setVisibility(View.GONE);
        title_question_comp = findViewById(R.id.title_question_comp);
        Intent intent = getIntent();
        cant = intent.getIntExtra("index", 1);
        question.setSurvey_id(intent.getIntExtra("survey_id",1));
        Toast.makeText(this, question.getSurvey_id()+"", Toast.LENGTH_SHORT).show();

      sequenceNumber.setText(String.valueOf(cant));

        title_question_comp.setText("Question "+cant);
        dropdown = findViewById(R.id.question_type_maker);
        dropdown.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
                if(position==2){
                    addDef.setVisibility(View.VISIBLE);
                    addQuest(linearLayout);
                }else{
                    if(linearLayout.getChildCount()>8){
                        for(int i=0; i<definedAnswers.size(); i++){
                            linearLayout.removeViewAt(3);
                        }
                        definedAnswers = new ArrayList<>();
                        addDef.setVisibility(View.GONE);
                    }
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parentView) {
                // your code here
            }

        });
        loadQuestionType();

    }public void endSurvey(View v){
        if(TextUtils.isEmpty(questionText.getText().toString()) ||
                TextUtils.isEmpty(sequenceNumber.getText().toString()) ||
                TextUtils.isEmpty(dropdown.getSelectedItem().toString())
        ){
            Toast.makeText(this, "Whoops!, there are missing fields", Toast.LENGTH_SHORT).show();
            return;
        }

        question.setQuestion_text(questionText.getText().toString());
        question.setSequence_number(Integer.parseInt((sequenceNumber.getText().toString())));
        question.setRequired(requiredSwitch.isChecked()?1:0);
        question.setQuestion_type_id(Integer.parseInt(dropdown.getSelectedItem().toString().split(" - ")[0]));

        for(int i=0; i<definedAnswers.size(); i++){
            EditText defAns = (EditText) linearLayout.getChildAt(3+i);
            definedAnswers.get(i).setDefined_answer_text(defAns.getText().toString());
        }

        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/question/save";

        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Toast.makeText(QuestionMakerActivity.this, "Good questions!", Toast.LENGTH_SHORT).show();
                        Intent intent = new Intent(QuestionMakerActivity.this, SurveyListedActivity.class);

                        Gson gson = new Gson();
                        questionCreated = gson.fromJson(res, QuestionCreated.class);
                        question.setQuestion_id(questionCreated.getQuestion().getQuestion_id());
                        saveDefinedAnswers();

                        startActivity(intent);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(QuestionMakerActivity.this, "Whoops! Something went wrong", Toast.LENGTH_SHORT).show();
            }
        }){

            protected Map<String, String> getParams(){
                Map<String, String> paramV = new HashMap<>();
                paramV.put("survey_id", String.valueOf(question.getSurvey_id()));
                paramV.put("question_text", question.getQuestion_text());
                paramV.put("question_type_id",String.valueOf(question.getQuestion_type_id()));
                paramV.put("required", String.valueOf(question.getRequired()));
                paramV.put("sequence_number", String.valueOf(question.getRequired()));

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

    public void saveQuestion(View v){
        if(TextUtils.isEmpty(questionText.getText().toString()) ||
                TextUtils.isEmpty(sequenceNumber.getText().toString()) ||
                TextUtils.isEmpty(dropdown.getSelectedItem().toString())
        ){
            Toast.makeText(this, "Whoops!, there are missing fields", Toast.LENGTH_SHORT).show();
            return;
        }

        question.setQuestion_text(questionText.getText().toString());
        question.setSequence_number(Integer.parseInt((sequenceNumber.getText().toString())));
        question.setRequired(requiredSwitch.isChecked()?1:0);
        question.setQuestion_type_id(Integer.parseInt(dropdown.getSelectedItem().toString().split(" - ")[0]));

        for(int i=0; i<definedAnswers.size(); i++){
            EditText defAns = (EditText) linearLayout.getChildAt(3+i);
            definedAnswers.get(i).setDefined_answer_text(defAns.getText().toString());
        }

        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/question/save";

        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Intent intent = new Intent(QuestionMakerActivity.this, QuestionMakerActivity.class);
                        intent.putExtra("index", cant+1);
                        intent.putExtra("survey_id", question.getSurvey_id());

                        Gson gson = new Gson();
                        questionCreated = gson.fromJson(res, QuestionCreated.class);
                        question.setQuestion_id(questionCreated.getQuestion().getQuestion_id());
                        saveDefinedAnswers();

                        startActivity(intent);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(QuestionMakerActivity.this, "Whoops! Something went wrong", Toast.LENGTH_SHORT).show();
            }
        }){

            protected Map<String, String> getParams(){
                Map<String, String> paramV = new HashMap<>();
                paramV.put("survey_id", String.valueOf(question.getSurvey_id()));
                paramV.put("question_text", question.getQuestion_text());
                paramV.put("question_type_id",String.valueOf(question.getQuestion_type_id()));
                paramV.put("required", String.valueOf(question.getRequired()));
                paramV.put("sequence_number", String.valueOf(question.getRequired()));

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

    public void saveDefinedAnswers(){
        for (DefinedAnswerRaw df:
             definedAnswers) {
            String token = TokenApp.getTOKEN();

            RequestQueue queue = Volley.newRequestQueue(this);
            String url ="https://surveyvor.shocklogic.com/api/definedAnswer/save";

            StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String res) {}
                    }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    System.out.println(error.networkResponse.toString());
                    Toast.makeText(QuestionMakerActivity.this, "Whoops! Something went wrong", Toast.LENGTH_SHORT).show();
                }
            }){

                protected Map<String, String> getParams(){
                    Map<String, String> paramV = new HashMap<>();
                    paramV.put("question_id", String.valueOf(question.getQuestion_id()));
                    paramV.put("defined_answer_text",df.getDefined_answer_text());

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

    public void loadQuestionType(){
        String token = TokenApp.getTOKEN();
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/questionType/all";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        questionType = gson.fromJson(res, QuestionType.class);
                        String[] items = new String[questionType.getQuestionType().size()];
                        for (int i=0; i<questionType.getQuestionType().size(); i++)
                        {
                            items[i] = questionType.getQuestionType().get(i).getQuestion_type_id()+" - "+questionType.getQuestionType().get(i).getQuestion_type_text();
                        }
                        ArrayAdapter<String> adapter = new ArrayAdapter<String>(QuestionMakerActivity.this,
                                android.R.layout.simple_spinner_item,items);

                        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                        dropdown.setAdapter(adapter);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(QuestionMakerActivity.this, "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
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

    public void addQuest(View v){
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(560, LinearLayout.LayoutParams.WRAP_CONTENT);
        params.topMargin = 10;
        //Edit Text Defined Answer
        EditText defAns = new EditText(this);
        defAns.setInputType(InputType.TYPE_TEXT_FLAG_IME_MULTI_LINE);

        defAns.setLayoutParams(params);
        defAns.setHint("Defined Answer");

        definedAnswers.add(new DefinedAnswerRaw());

        linearLayout.addView(defAns,3);

    }

}