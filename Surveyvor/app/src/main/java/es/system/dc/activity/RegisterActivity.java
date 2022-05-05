package es.system.dc.activity;

import android.text.TextUtils;
import android.view.View;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import es.system.dc.R;
import es.system.dc.model.Country;
import es.system.dc.model.Token;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RegisterActivity extends AppCompatActivity {
    TextView email_register, password_register, first_name_register, family_name_register, avatar_register, telephone_register;
    Spinner dropdown;
    List<Country> countries = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        email_register = findViewById(R.id.email_register);
        password_register = findViewById(R.id.password_register);
        first_name_register = findViewById(R.id.first_name_register);
        family_name_register = findViewById(R.id.family_name_register);
        avatar_register = findViewById(R.id.avatar_register);
        telephone_register = findViewById(R.id.telephone_register);

        dropdown = findViewById(R.id.country_code_register);
        loadCountriesData();

    }

    public void loadCountriesData(){
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        countries = gson.fromJson(res, new TypeToken<List<Country>>(){}.getType());
                        String[] items = new String[countries.size()];
                        for (int i=0; i<countries.size(); i++)
                        {
                            items[i] = countries.get(i).code+" - "+countries.get(i).name;
                        }
                        ArrayAdapter<String>adapter = new ArrayAdapter<String>(RegisterActivity.this,
                                android.R.layout.simple_spinner_item,items);

                        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                        dropdown.setAdapter(adapter);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(RegisterActivity.this, "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
            }
        });

        queue.add(stringRequest);
    }


    public void register(View v){

        if(TextUtils.isEmpty(email_register.getText().toString()) ||
                TextUtils.isEmpty(password_register.getText().toString()) ||
                TextUtils.isEmpty(first_name_register.getText().toString()) ||
                TextUtils.isEmpty(family_name_register.getText().toString()) ||
                TextUtils.isEmpty(dropdown.getSelectedItem().toString())
        ){
            Toast.makeText(this, "Whoops!, there are missing fields", Toast.LENGTH_SHORT).show();
            return;
        }

        if(password_register.getText().toString().length()<6){
            Toast.makeText(this, "Password field needs 6 chars at least", Toast.LENGTH_SHORT).show();
            return;
        }

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/auth/register";

        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        System.out.println(res);
                        Toast.makeText(RegisterActivity.this, "Successfully registered!", Toast.LENGTH_SHORT).show();
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(RegisterActivity.this, "Whoops! Something went wrong", Toast.LENGTH_SHORT).show();
            }
        }){
            protected Map<String, String> getParams(){
                String[] countryCode = dropdown.getSelectedItem().toString().split(" - ");
                Map<String, String> paramV = new HashMap<>();
                paramV.put("email", email_register.getText().toString());
                paramV.put("password", password_register.getText().toString());
                paramV.put("first_name", first_name_register.getText().toString());
                paramV.put("family_name", family_name_register.getText().toString());
                paramV.put("country_code", countryCode[0]);
                paramV.put("telephone", telephone_register.getText().toString());
                paramV.put("avatar", avatar_register.getText().toString());
                return paramV;
            }
        };
        queue.add(stringRequest);
    }
}