package com.example.test1.Adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.test1.Models.MainModel;
import com.example.test1.R;

import java.util.ArrayList;

public class MainAdapter extends  RecyclerView.Adapter<MainAdapter.viewholder> {

    ArrayList<MainModel> list;
    Context context;

    public MainAdapter(ArrayList<MainModel> list, Context context) {
        this.list = list;
        this.context = context;
    }

    @NonNull
    @Override
    public viewholder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view= LayoutInflater.from(context).inflate(R.layout.sample_mainfood,parent,false);
        return new viewholder( view);
    }

    @Override
    public void onBindViewHolder(@NonNull viewholder holder, int position) {
        final MainModel model=list.get(position);
        holder.foodimage.setImageResource(model.getImage());
        holder.name.setText(model.getName());
        holder.price.setText(model.getPrice());
        holder.description.setText(model.getDescription());


    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    public class  viewholder extends RecyclerView.ViewHolder {
        ImageView foodimage;
        TextView name,price,description;
        public viewholder(@NonNull View itemView) {
            super(itemView);
            foodimage=itemView.findViewById(R.id.imageView2);
            name=itemView.findViewById(R.id.name);
            price=itemView.findViewById(R.id.price);
            description=itemView.findViewById(R.id.description);

        }
    }
}
