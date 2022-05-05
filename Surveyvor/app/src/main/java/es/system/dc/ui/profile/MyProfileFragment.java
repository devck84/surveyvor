package es.system.dc.ui.profile;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.os.Bundle;
import android.text.TextUtils;
import android.widget.*;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import es.system.dc.R;
import es.system.dc.activity.RegisterActivity;
import es.system.dc.adapter.SurveyAdapter;
import es.system.dc.databinding.FragmentMyProfileBinding;
import es.system.dc.model.Country;
import es.system.dc.model.Survey;
import es.system.dc.model.TokenApp;
import es.system.dc.model.UserRaw;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static androidx.core.content.ContextCompat.getSystemService;

public class MyProfileFragment extends Fragment {
    Integer userId;
    TextView email_my_profile, first_name_my_profile, family_name_my_profile, avatar_my_profile, telephone_my_profile;
    Spinner dropdown;
    Button btnSave, shareProfileButton;
    List<Country> countries = new ArrayList<>();
    private FragmentMyProfileBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = FragmentMyProfileBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        email_my_profile = root.findViewById(R.id.email_my_profile);
        first_name_my_profile = root.findViewById(R.id.first_name_my_profile);
        family_name_my_profile = root.findViewById(R.id.family_name_my_profile);
        avatar_my_profile = root.findViewById(R.id.avatar_my_profile);
        telephone_my_profile = root.findViewById(R.id.telephone_my_profile);
        dropdown = root.findViewById(R.id.country_code_my_profile);
        btnSave = root.findViewById(R.id.button_save_details);
        shareProfileButton = root.findViewById(R.id.shareProfileButton);
        btnSave.setOnClickListener(v -> saveDetails(root));
        shareProfileButton.setOnClickListener(v -> shareProfile(root));
        loadCountriesData(root);
        return root;
    }
    public void shareProfile(View v) {
        Toast.makeText(v.getContext(), "Copied", Toast.LENGTH_SHORT).show();
        ClipboardManager clipboard = getSystemService(getContext(), ClipboardManager.class);
        ClipData clip = ClipData.newPlainText("my profile","https://www.surveyvor-shocklogic.com/user/"+userId);
        clipboard.setPrimaryClip(clip);
    }

    public void saveDetails(View v){
        if(
                TextUtils.isEmpty(first_name_my_profile.getText().toString()) ||
                TextUtils.isEmpty(family_name_my_profile.getText().toString()) ||
                TextUtils.isEmpty(dropdown.getSelectedItem().toString())
        ){
            Toast.makeText(v.getContext(), "Whoops!, there are missing fields", Toast.LENGTH_SHORT).show();
            return;
        }
        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(v.getContext());
        String url ="https://surveyvor.shocklogic.com/api/auth/update/"+userId;

        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        System.out.println(res);
                        Toast.makeText(v.getContext(), "Successfully updated!", Toast.LENGTH_SHORT).show();
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(v.getContext(), "Whoops! Something went wrong", Toast.LENGTH_SHORT).show();
            }
        }){
            protected Map<String, String> getParams(){
                String[] countryCode = dropdown.getSelectedItem().toString().split(" - ");
                Map<String, String> paramV = new HashMap<>();
                paramV.put("first_name", first_name_my_profile.getText().toString());
                paramV.put("family_name", family_name_my_profile.getText().toString());
                paramV.put("country_code", countryCode[0]);
                paramV.put("telephone", telephone_my_profile.getText().toString());
                paramV.put("avatar", avatar_my_profile.getText().toString());
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

    public void loadAdapter(){
        String token = TokenApp.getTOKEN();
        RequestQueue queue = Volley.newRequestQueue(getContext());
        String url ="https://surveyvor.shocklogic.com/api/auth/me";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        UserRaw jsonObject = gson.fromJson( res, UserRaw.class);
                        System.out.println(res);
                        userId = jsonObject.getUser_id();
                        email_my_profile.setText(jsonObject.getEmail());
                        first_name_my_profile.setText(jsonObject.getFirst_name());
                        family_name_my_profile.setText(jsonObject.getFamily_name());
                        avatar_my_profile.setText(jsonObject.getAvatar());
                        if(String.valueOf(jsonObject.getTelephone())!="null"){
                            telephone_my_profile.setText(String.valueOf(jsonObject.getTelephone()));
                        }
                        selectSpinnerValue(jsonObject.getCountry_code());


                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(getContext(), "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
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

    public void loadCountriesData(View v){
        RequestQueue queue = Volley.newRequestQueue(v.getContext());
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
                        ArrayAdapter<String> adapter = new ArrayAdapter<String>(v.getContext(),
                                android.R.layout.simple_spinner_item,items);

                        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                        dropdown.setAdapter(adapter);
                        loadAdapter();
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(v.getContext(), "Whoops! Check your connection", Toast.LENGTH_SHORT).show();
            }
        });

        queue.add(stringRequest);
    }

}