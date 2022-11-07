<?php

namespace App\Http\Controllers;

use App\Models\Likes;
use App\Models\Posts;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function authuser()
    {
        return User::where('id', Auth::user()->id)->get();
    }

    public function posts()
    {
        return Posts::orderBy('id', 'desc')->get();
    }

    public function post($id)
    {
        return Posts::where('id', $id)->get();
    }

    public function makepost(Request $req)
    {
        $req->validate([
            'header' => 'required',
            'title' => 'required'
        ]);
        $postbyid = Auth::user()->id;
        $postby = Auth::user()->username;
        $header = htmlspecialchars($req->header);
        $title = nl2br(htmlspecialchars($req->title));
        $data = ['postbyid' => $postbyid, 'postby' => $postby, 'header' => $header, 'title' => $title];
        Posts::insert($data);
    }

    public function likepost(Request $req)
    {
        $like = Likes::where('likebyid', Auth::user()->id)->where('postid', $req->id)->get();
        if (count($like) !== 1) {
            Posts::where('id', $req->id)->increment('likes');
            $data = ['likebyid' => Auth::user()->id, 'postid' => $req->id];
            Likes::insert($data);
        } else {
            Posts::where('id', $req->id)->decrement('likes');
            Likes::where('id', $req->id)->delete();
        }
    }

    public function deletepost(Request $req)
    {
        Posts::where('id', $req->id)->delete();
        Likes::where('postid', $req->id)->delete();
    }
}
