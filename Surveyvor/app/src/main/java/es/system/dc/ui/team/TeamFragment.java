package es.system.dc.ui.team;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import es.system.dc.R;
import es.system.dc.activity.CreateTeamActivity;
import es.system.dc.activity.SurveyDetailsActivity;
import es.system.dc.adapter.SurveyAdapter;
import es.system.dc.adapter.TeamAdapter;
import es.system.dc.databinding.FragmentTeamBinding;
import es.system.dc.model.Survey;
import es.system.dc.model.Team;
import es.system.dc.model.TokenApp;

import java.util.HashMap;
import java.util.Map;

public class TeamFragment extends Fragment {
    TeamAdapter teamAdapter;
    RecyclerView recyclerView;
    private FragmentTeamBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = FragmentTeamBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        root.findViewById(R.id.floatingActionButton_add_team).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(root.getContext(), CreateTeamActivity.class);
                startActivity(intent);
            }
        });
        loadAdapter();
        return root;
    }

    public void loadAdapter(){
        String token = TokenApp.getTOKEN();
        RequestQueue queue = Volley.newRequestQueue(getContext());
        String url ="https://surveyvor.shocklogic.com/api/team/mine";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        Team jsonObject = gson.fromJson( res, Team.class);
                        teamAdapter = new TeamAdapter(getContext(), jsonObject.getTeam());
                        recyclerView = (RecyclerView) getView().findViewById(R.id.recyclerViewTeam);
                        recyclerView.setAdapter(teamAdapter);
                        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

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

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}