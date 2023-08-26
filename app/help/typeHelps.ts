export interface ToggleItem {
  label: string;
  icon: string;
}

export interface VideoDataItem {
  aid: number;
  bvid: string;
  cid: number;
  copyright: number;
  ctime: number;
  desc: string;
  desc_v2: [
    {
      biz_id: number;
      raw_text: string;
      type: number;
    }
  ];
  dimension: {
    height: number;
    rotate: number;
    width: number;
  };
  disable_show_up_info: boolean;
  duration: number;
  dynamic: string;
  enable_vt: number;
  honor_reply: {
    honor: [
      {
        aid: number;
        desc: string;
        type: number;
        weekly_recommend_num: number;
      },
      {
        aid: number;
        desc: string;
        type: number;
        weekly_recommend_num: number;
      }
    ];
  };
  is_chargeable_season: boolean;
  is_season_display: boolean;
  is_story: boolean;
  is_upower_exclusive: boolean;
  is_upower_play: boolean;
  like_icon: string;
  need_jump_bv: boolean;
  no_cache: boolean;
  owner: {
    face: string;
    mid: number;
    name: string;
  };
  pages: [
    {
      cid: number;
      dimension: {
        height: number;
        rotate: number;
        width: number;
      };
      duration: number;
      first_frame: string;
      from: string;
      page: number;
      part: string;
      vid: string;
      weblink: string;
    }
  ];
  pic: string;
  premiere: null;
  pubdate: number;
  rights: {
    arc_pay: number;
    autoplay: number;
    bp: number;
    clean_mode: number;
    download: number;
    elec: number;
    free_watch: number;
    hd5: number;
    is_360: number;
    is_cooperation: number;
    is_stein_gate: number;
    movie: number;
    no_background: number;
    no_reprint: number;
    no_share: number;
    pay: number;
    ugc_pay: number;
    ugc_pay_preview: number;
  };
  stat: {
    aid: number;
    argue_msg: string;
    coin: number;
    danmaku: number;
    dislike: number;
    evaluation: string;
    favorite: number;
    his_rank: number;
    like: number;
    now_rank: number;
    reply: number;
    share: number;
    view: number;
    vt: number;
  };
  state: number;
  subtitle: {
    allow_submit: boolean;
    list: [];
  };
  teenage_mode: number;
  tid: number;
  title: string;
  tname: string;
  user_garb: {
    url_image_ani_cut: string;
  };
  videos: number;
  vt_display: string;
}
