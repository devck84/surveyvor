<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DefinedAnswer extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'DefinedAnswer';

    public function getKeyName(){
        return "defined_answer_id";
    }
     protected $fillable = [
        'defined_answer_id',
    	'question_id',
    ];
}
