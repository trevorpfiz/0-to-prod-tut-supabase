const mockUrls = [
  "https://wpcbdblradsxjxirufbv.supabase.co/storage/v1/object/sign/mock/spark-bang.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2NrL3NwYXJrLWJhbmcucG5nIiwiaWF0IjoxNzE0NTgyODk2LCJleHAiOjE3MTUxODc2OTZ9.bCksUZGc5TeyeUgsmbY12_-65GUvdCHNoCvk2s0J4bI&t=2024-05-01T17%3A01%3A36.470Z",
  "https://wpcbdblradsxjxirufbv.supabase.co/storage/v1/object/sign/mock/spark-bang-original.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2NrL3NwYXJrLWJhbmctb3JpZ2luYWwuanBnIiwiaWF0IjoxNzE0NTgyOTE1LCJleHAiOjE3MTUxODc3MTV9.PPwvfIS7cDNEJseeRwIGVDyQLxZ20JTbK2Dz0CQOYTo&t=2024-05-01T17%3A01%3A55.194Z",
  "https://wpcbdblradsxjxirufbv.supabase.co/storage/v1/object/sign/mock/Spark_logo_icon_design_yellow_lightning_bolt_red_background_vec_493b6293-fbaa-4bb6-af27-7ff76cfe94ea.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2NrL1NwYXJrX2xvZ29faWNvbl9kZXNpZ25feWVsbG93X2xpZ2h0bmluZ19ib2x0X3JlZF9iYWNrZ3JvdW5kX3ZlY180OTNiNjI5My1mYmFhLTRiYjYtYWYyNy03ZmY3NmNmZTk0ZWEucG5nIiwiaWF0IjoxNzE0NTgyOTIyLCJleHAiOjE3MTUxODc3MjJ9.cb6rl52Y8iFfkG2u8KOdtL-7eC8XC5Vg_ZyHLhUOs7M&t=2024-05-01T17%3A02%3A02.685Z",
  "https://wpcbdblradsxjxirufbv.supabase.co/storage/v1/object/sign/mock/Spark_logo_icon_design_lightning_bolt_vector_flat_2d_84aae542-3598-4be4-9053-dddfb5e3ac6f.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtb2NrL1NwYXJrX2xvZ29faWNvbl9kZXNpZ25fbGlnaHRuaW5nX2JvbHRfdmVjdG9yX2ZsYXRfMmRfODRhYWU1NDItMzU5OC00YmU0LTkwNTMtZGRkZmI1ZTNhYzZmLnBuZyIsImlhdCI6MTcxNDU4MjkyOSwiZXhwIjoxNzE1MTg3NzI5fQ.TgF9jSCyhGzBxrpqjwitY7TRJB46Dte4pa55ih4b88I&t=2024-05-01T17%3A02%3A09.190Z",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="logo" />
          </div>
        ))}
      </div>
    </main>
  );
}
