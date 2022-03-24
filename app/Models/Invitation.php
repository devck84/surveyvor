<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'Invitation';

    public function getKeyName(){
        return "invitation_id";
    }
     protected $fillable = [
        'sender_id',
        'receiver_id',
        'date_sent',
    ];
}
