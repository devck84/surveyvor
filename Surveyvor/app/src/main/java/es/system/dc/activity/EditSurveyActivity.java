package es.system.dc.activity;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
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
import es.system.dc.R;
import es.system.dc.model.Privacy;
import es.system.dc.model.SurveyCreated;
import es.system.dc.model.TokenApp;
import yuku.ambilwarna.AmbilWarnaDialog;

import java.util.HashMap;
import java.util.Map;

import static androidx.core.content.ContextCompat.getSystemService;

public class EditSurveyActivity extends AppCompatActivity {
    Integer survey_id;
    SurveyCreated survey = new SurveyCreated();
    Button btnBackgroundColor, btnBtnColor;
    int defaultBackgroundColor, defaultBtnColor;
    EditText surveyName, surveyDescription;
    Spinner dropdown;
    Privacy privacy;
    Switch activeSwitch;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_survey);
        defaultBackgroundColor = ContextCompat.getColor(EditSurveyActivity.this, R.color.design_default_color_primary);
        surveyName = findViewById(R.id.survey_name_edit);
        surveyDescription = findViewById(R.id.survey_description_edit);
        defaultBtnColor = ContextCompat.getColor(EditSurveyActivity.this, R.color.design_default_color_primary);
        btnBackgroundColor = findViewById(R.id.button_background_color_edit);
        btnBtnColor = findViewById(R.id.button_button_color_edit);
        activeSwitch = findViewById(R.id.activeSwitch);
        dropdown = findViewById(R.id.privacy_edit);
        Intent intent = getIntent();
        survey_id = intent.getIntExtra("survey_id",1);
        loadPrivacyData();
        loadSurvey();
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

    private void selectSpinnerValue(String myString)
    {
        for(int i = 0; i < dropdown.getCount(); i++){
            String cntr = dropdown.getItemAtPosition(i).toString().split(" - ")[0];
            if(cntr.equals(myString)){
                dropdown.setSelection(i);
                break;
            }
        }
    }

    public void loadSurvey(){
        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/survey/mine/"+survey_id;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        survey = gson.fromJson(res, SurveyCreated.class);
                        surveyName.setText(survey.getSurvey().getSurvey_name());
                        surveyDescription.setText(survey.getSurvey().getSurvey_description());
                        defaultBackgroundColor = Color.parseColor(survey.getSurvey().getBackground_color());
                        btnBackgroundColor.setBackgroundColor(Color.parseColor(survey.getSurvey().getBackground_color()));
                        btnBtnColor.setBackgroundColor(Color.parseColor(survey.getSurvey().getButton_color()));
                        defaultBtnColor = Color.parseColor(survey.getSurvey().getButton_color());
                        selectSpinnerValue(String.valueOf(survey.getSurvey().getPrivacy_id()));
                        activeSwitch.setChecked(survey.getSurvey().getActive()==1?true:false);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(EditSurveyActivity.this, "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
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
                        ArrayAdapter<String> adapter = new ArrayAdapter<String>(EditSurveyActivity.this,
                                android.R.layout.simple_spinner_item,items);

                        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                        dropdown.setAdapter(adapter);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(EditSurveyActivity.this, "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
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

    public void updateSurvey(View v){
        if(TextUtils.isEmpty(surveyName.getText().toString()) ||
                TextUtils.isEmpty(surveyDescription.getText().toString()) ||
                TextUtils.isEmpty(dropdown.getSelectedItem().toString())
        ){
            Toast.makeText(this, "Whoops!, there are missing fields", Toast.LENGTH_SHORT).show();
            return;
        }

        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/survey/update/"+survey_id;

        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Intent intent = new Intent(EditSurveyActivity.this,SurveyListedActivity.class);
                        Toast.makeText(EditSurveyActivity.this, "Successfully updated", Toast.LENGTH_SHORT).show();
                        startActivity(intent);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(EditSurveyActivity.this, "Whoops! Something went wrong", Toast.LENGTH_SHORT).show();
            }
        }){

            protected Map<String, String> getParams(){
                Map<String, String> paramV = new HashMap<>();
                paramV.put("privacy_id", dropdown.getSelectedItem().toString().split(" - ")[0]);
                paramV.put("survey_name", surveyName.getText().toString());
                paramV.put("survey_description", surveyDescription.getText().toString());
                paramV.put("button_color", String.format("#%06X", (0xFFFFFF & defaultBtnColor)));
                paramV.put("background_color", String.format("#%06X", (0xFFFFFF & defaultBackgroundColor)));
                paramV.put("active", String.valueOf(activeSwitch.isChecked()?1:0));
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

    public void goToSurveyStats(View v){
        Intent intent = new Intent(EditSurveyActivity.this, QuestionsPerSurveyActivity.class);
        intent.putExtra("survey_id", survey_id);
        startActivity(intent);
    }

    public void shareSurvey(View v){
        Toast.makeText(v.getContext(), "Copied", Toast.LENGTH_SHORT).show();
        ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
        ClipData clip = ClipData.newPlainText("my survey","https://www.surveyvor-shocklogic.com/survey/"+survey_id);
        clipboard.setPrimaryClip(clip);
    }
}