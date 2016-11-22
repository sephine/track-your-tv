# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161122001125) do

  create_table "episode_infos", force: :cascade do |t|
    t.integer  "tvdb_ref"
    t.integer  "episode_number"
    t.integer  "season_number"
    t.string   "episodeName"
    t.string   "firstAired"
    t.text     "overview"
    t.integer  "programme_info_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["programme_info_id"], name: "index_episode_infos_on_programme_info_id"
    t.index ["tvdb_ref"], name: "index_episode_infos_on_tvdb_ref", unique: true
  end

  create_table "posters", force: :cascade do |t|
    t.integer  "tvdb_ref"
    t.string   "thumbnail"
    t.float    "rating_average"
    t.integer  "programme_info_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["programme_info_id"], name: "index_posters_on_programme_info_id"
    t.index ["tvdb_ref"], name: "index_posters_on_tvdb_ref", unique: true
  end

  create_table "programme_infos", force: :cascade do |t|
    t.integer  "tvdb_ref"
    t.string   "seriesName"
    t.string   "status"
    t.string   "firstAired"
    t.string   "network"
    t.string   "runtime"
    t.string   "genre"
    t.text     "overview"
    t.integer  "lastUpdated"
    t.string   "airsDayOfWeek"
    t.string   "airsTime"
    t.string   "imdbID"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "ratingCount"
    t.index ["tvdb_ref"], name: "index_programme_infos_on_tvdb_ref", unique: true
  end

  create_table "tokens", force: :cascade do |t|
    t.string   "text"
    t.datetime "refreshed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tracked_programmes", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "image"
    t.integer  "programme_info_id"
    t.boolean  "ignored"
    t.index ["programme_info_id"], name: "index_tracked_programmes_on_programme_info_id"
    t.index ["user_id"], name: "index_tracked_programmes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "watched_episodes", force: :cascade do |t|
    t.boolean  "watched"
    t.integer  "tracked_programme_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.integer  "episode_info_id"
    t.index ["episode_info_id"], name: "index_watched_episodes_on_episode_info_id"
    t.index ["tracked_programme_id"], name: "index_watched_episodes_on_tracked_programme_id"
  end

end
