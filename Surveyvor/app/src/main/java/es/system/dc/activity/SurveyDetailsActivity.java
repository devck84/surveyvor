package es.system.dc.activity;

import android.content.Intent;
import android.text.TextUtils;
import android.view.View;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import androidx.core.content.ContextCompat;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import es.system.dc.R;
import es.system.dc.model.*;
import yuku.ambilwarna.AmbilWarnaDialog;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SurveyDetailsActivity extends AppCompatActivity {
    Button btnBackgroundColor, btnBtnColor;
    int defaultBackgroundColor, defaultBtnColor = 000000;
    EditText surveyName, surveyDescription;
    Privacy privacy;
    SurveyRaw survey = new SurveyRaw();
    SurveyCreated finalSur = new SurveyCreated();
    Spinner dropdown;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_survey_details);
        defaultBackgroundColor = ContextCompat.getColor(SurveyDetailsActivity.this, R.color.design_default_color_primary);
        surveyName = findViewById(R.id.survey_name_details);
        surveyDescription = findViewById(R.id.survey_description_details);
        defaultBtnColor = ContextCompat.getColor(SurveyDetailsActivity.this, R.color.design_default_color_primary);
        btnBackgroundColor = findViewById(R.id.button_background_color_details);
        btnBtnColor = findViewById(R.id.button_button_color_details);
        dropdown = findViewById(R.id.privacy_details);
        loadPrivacyData();
        btnBackgroundColor.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openColorPicker(1);
            }
        });
        btnBtnColor.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openColorPicker(2);
            }
        });
    }
    public void openColorPicker(int type){
        switch(type){
            case 1:
                AmbilWarnaDialog colorpicker = new AmbilWarnaDialog(this, defaultBackgroundColor, new AmbilWarnaDialog.OnAmbilWarnaListener() {
                    @Override
                    public void onCancel(AmbilWarnaDialog dialog) {}

                    @Override
                    public void onOk(AmbilWarnaDialog dialog, int color) {
                        defaultBackgroundColor = color;
                        btnBackgroundColor.setBackgroundColor(color);
                    }
                });

                colorpicker.show();
                break;
            case 2:
                AmbilWarnaDialog colorpicker2 = new AmbilWarnaDialog(this, defaultBtnColor, new AmbilWarnaDialog.OnAmbilWarnaListener() {
                    @Override
                    public void onCancel(AmbilWarnaDialog dialog) {}

                    @Override
                    public void onOk(AmbilWarnaDialog dialog, int color) {
                        defaultBtnColor = color;
                        btnBtnColor.setBackgroundColor(color);
                    }
                });

                colorpicker2.show();
                break;
        }

    }
    public void loadPrivacyData(){
        String token = TokenApp.getTOKEN();
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/privacy/all";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        privacy = gson.fromJson(res, Privacy.class);
                        String[] items = new String[privacy.getPrivacy().size()];
                        for (int i=0; i<privacy.getPrivacy().size(); i++)
                        {
                            items[i] = privacy.getPrivacy().get(i).getPrivacy_id()+" - "+privacy.getPrivacy().get(i).getPrivacy_name();
                        }
                        ArrayAdapter<String> adapter = new ArrayAdapter<String>(SurveyDetailsActivity.this,
                                android.R.layout.simple_spinner_item,items);

                        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                        dropdown.setAdapter(adapter);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(SurveyDetailsActivity.this, "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
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

    public void createQuests(View v){
        if(TextUtils.isEmpty(surveyName.getText().toString()) ||
                TextUtils.isEmpty(surveyDescription.getText().toString()) ||
                TextUtils.isEmpty(dropdown.getSelectedItem().toString())
        ){
            Toast.makeText(this, "Whoops!, there are missing fields", Toast.LENGTH_SHORT).show();
            return;
        }

        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/survey/save";

        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Intent intent = new Intent(SurveyDetailsActivity.this,QuestionMakerActivity.class);
                        Gson gson = new Gson();
                        finalSur = gson.fromJson(res, SurveyCreated.class);
                        intent.putExtra("survey_id", finalSur.getSurvey().getSurvey_id());
                        startActivity(intent);

                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(SurveyDetailsActivity.this, "Whoops! Something went wrong", Toast.LENGTH_SHORT).show();
            }
        }){

            protected Map<String, String> getParams(){
                Map<String, String> paramV = new HashMap<>();
                paramV.put("privacy_id", dropdown.getSelectedItem().toString().split(" - ")[0]);
                paramV.put("survey_name", surveyName.getText().toString());
                paramV.put("survey_description", surveyDescription.getText().toString());
                paramV.put("button_color", String.format("#%06X", (0xFFFFFF & defaultBtnColor)));
                paramV.put("background_color", String.format("#%06X", (0xFFFFFF & defaultBackgroundColor)));

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