<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFriend extends Model
{
    use HasFactory;
    public $timestamps = false;
    
    protected $table = 'UserFriend';

    protected $fillable = [
        'user_id_from',
        'user_id_to',
        'date_related',
    ];

    public function getKeyName(){
        return "user_friend_id";
    }
}
