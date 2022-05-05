package es.system.dc.ui.friend;

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
import es.system.dc.activity.MainChatActivity;
import es.system.dc.activity.SurveyDetailsActivity;
import es.system.dc.adapter.FriendAdapter;
import es.system.dc.adapter.TeamAdapter;
import es.system.dc.databinding.FragmentFriendBinding;
import es.system.dc.model.Friend;
import es.system.dc.model.Team;
import es.system.dc.model.TokenApp;
import es.system.dc.model.User;

import java.util.HashMap;
import java.util.Map;

public class FriendFragment extends Fragment {
    FriendAdapter friendAdapter;
    RecyclerView recyclerView;
    private FragmentFriendBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = FragmentFriendBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        root.findViewById(R.id.floatingActionMessage).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(root.getContext(), MainChatActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);

            }
        });
        loadAdapter();
        return root;
    }

    public void loadAdapter(){
        String token = TokenApp.getTOKEN();
        RequestQueue queue = Volley.newRequestQueue(getContext());
        String url ="https://surveyvor.shocklogic.com/api/userFriend/mine";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {
                        Gson gson = new Gson();
                        Friend jsonObject = gson.fromJson( res, Friend.class);
                        friendAdapter = new FriendAdapter(getContext(), jsonObject.getFriend());
                        recyclerView = (RecyclerView) getView().findViewById(R.id.recyclerViewFriend);
                        recyclerView.setAdapter(friendAdapter);
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