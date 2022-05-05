package es.system.dc.activity;

import android.content.Intent;
import android.text.TextUtils;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import es.system.dc.R;
import es.system.dc.model.*;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {
    TextView email_login, password_login;
    Token userToken = new Token();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        email_login = findViewById(R.id.email_login);
        password_login = findViewById(R.id.password_login);
    }

    public void goToRegisterView(View v){
        Intent intent = new Intent(MainActivity.this, RegisterActivity.class);
        startActivity(intent);
    }

    public void login(View v){
        if(TextUtils.isEmpty(email_login.getText().toString()) || TextUtils.isEmpty(password_login.getText().toString())){
            Toast.makeText(this, "Whoops!, there are missing fields", Toast.LENGTH_SHORT).show();
            return;
        }
        Intent intent = new Intent(MainActivity.this, SurveyListedActivity.class);

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="https://surveyvor.shocklogic.com/api/auth/login";

        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        userToken = gson.fromJson(res, Token.class);
                        TokenApp.setTOKEN(userToken.getToken_type()+" "+userToken.getAccess_token());
                        startActivity(intent);
                        Toast.makeText(MainActivity.this, "Welcome!", Toast.LENGTH_SHORT).show();
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(MainActivity.this, "Whoops! Wrong credentials", Toast.LENGTH_SHORT).show();
            }
        }){
            protected Map<String, String> getParams(){

            Map<String, String> paramV = new HashMap<>();
            paramV.put("email", email_login.getText().toString());
            paramV.put("password", password_login.getText().toString());
            return paramV;
            }
        };

        queue.add(stringRequest);



    }
}