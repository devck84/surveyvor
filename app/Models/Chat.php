<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'Chat';

    public function getKeyName(){
        return "chat_id";
    }
     protected $fillable = [
        'user_id_from',
        'user_id_to',
        'active',
    ];
}
