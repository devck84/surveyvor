package es.system.dc.ui.chat;

import android.graphics.Typeface;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.firebase.database.*;
import com.google.gson.Gson;
import es.system.dc.R;
import es.system.dc.activity.MessageActivity;
import es.system.dc.adapter.FriendAdapter;
import es.system.dc.adapter.OnItemClick;
import es.system.dc.adapter.UserAdapter;
import es.system.dc.model.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class ChatsFragment extends Fragment {

    private RecyclerView recyclerView;

   Typeface MR, MRR;
    private UserAdapter userAdapter;
    List<UserRaw> mUsers = new ArrayList<>();
    FrameLayout frameLayout;
    TextView es_descp, es_title;

    UserRaw me;
    DatabaseReference reference;

    private List<Chatlist> usersList;
    static OnItemClick onItemClick;


    public static ChatsFragment newInstance(OnItemClick click) {

        onItemClick = click;
        Bundle args = new Bundle();

        ChatsFragment fragment = new ChatsFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_chats, container, false);


        recyclerView = view.findViewById(R.id.recycler_view);
        frameLayout = view.findViewById(R.id.es_layout);
        es_title = view.findViewById(R.id.es_title);

        es_title.setTypeface(MRR);




        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        DividerItemDecoration dividerItemDecoration = new DividerItemDecoration(recyclerView.getContext(), DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(dividerItemDecoration);


        usersList = new ArrayList<>();

        String token = TokenApp.getTOKEN();

        RequestQueue queue = Volley.newRequestQueue(view.getContext());
        String url ="https://surveyvor.shocklogic.com/api/auth/me";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String res) {

                        Gson gson = new Gson();
                        me = gson.fromJson(res, UserRaw.class);

                        reference = FirebaseDatabase.getInstance().getReference("Chatlist").child(String.valueOf(me.getUser_id()));
                        reference.addValueEventListener(new ValueEventListener() {
                            @Override
                            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                                usersList.clear();
                                for (DataSnapshot snapshot : dataSnapshot.getChildren()){
                                    Chatlist chatlist = snapshot.getValue(Chatlist.class);
                                    usersList.add(chatlist);
                                }
                                if(usersList.size()==0){
                                    frameLayout.setVisibility(View.VISIBLE);
                                }
                                else{
                                    frameLayout.setVisibility(View.GONE);
                                }

                                chatList();
                            }

                            @Override
                            public void onCancelled(@NonNull DatabaseError databaseError) {

                            }
                        });
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.networkResponse.toString());
                Toast.makeText(view.getContext(), "Whoops! Something went wrong", Toast.LENGTH_SHORT).show();
            }
        }){
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Authorization", token);
                return params;
            }

        };
        queue.add(stringRequest);



        //updateToken(FirebaseInstanceId.getInstance().getToken());


        return view;
    }


    private void chatList() {
        for (int i=0; i<usersList.size();i++){
            int a = i;
            String token = TokenApp.getTOKEN();
            RequestQueue queue = Volley.newRequestQueue(getContext());
            String url ="https://surveyvor.shocklogic.com/api/auth/all/"+usersList.get(i).getId();

            StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String res) {
                            Gson gson = new Gson();
                            User jsonObject = gson.fromJson( res, User.class);

                            mUsers.add(jsonObject.getUser());
                            if(a == usersList.size()-1){
                                userAdapter = new UserAdapter(getContext(), onItemClick,mUsers, true, me);
                                recyclerView.setAdapter(userAdapter);
                            }

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

    }

}
