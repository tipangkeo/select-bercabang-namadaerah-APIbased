/*
  dropdown select nama daerah bercabang menggunakan data API https://dev.farizdotid.com/api/daerahindonesia
*/

// ambil data nama provinsi
$.getJSON(
  'https://dev.farizdotid.com/api/daerahindonesia/provinsi',
  function (data) {
    $('#select-provinsi').html('<option>Pilih Provinsi</option>');
    $('#select-kabupaten').html('<option>Pilih Kabupaten</option>');
    $('#select-kecamatan').html('<option>Pilih Kecamatan</option>');
    $('#select-kelurahan').html('<option>Pilih Kelurahan</option>');

    $.each(data.provinsi, function (_, value) {
      $('#select-provinsi').append(
        `
        <option data-id="` +
          value.id +
          `" class="search-kabupaten" value="` +
          value.nama +
          `">` +
          value.nama +
          `</option>
        `
      );
    });
  }
);

// ketika daftar provinsi di klik
$('#select-provinsi').on('click', '.search-kabupaten', function () {
  // let idProvinsi = $(this).val();
  let idProvinsi = $(this).data('id');

  $.getJSON(
    'https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=' +
      idProvinsi +
      '',
    function (data) {
      // hapus option select sebelumnya
      $('#select-kabupaten').empty();
      $('#select-kecamatan').empty();
      $('#select-kelurahan').empty();
      $('#select-kabupaten').html('<option>Pilih Kabupaten</option>');
      $('#select-kecamatan').html('<option>Pilih Kecamatan</option>');
      $('#select-kelurahan').html('<option>Pilih Kelurahan</option>');
      // masukan data ke select kabupaten
      $.each(data.kota_kabupaten, function (_, value) {
        $('#select-kabupaten').append(
          `
        <option data-id="` +
            value.id +
            `" class="search-kecamatan" value="` +
            value.nama +
            `">` +
            value.nama +
            `</option>
        `
        );
      });
    }
  );
});

// ketika daftar kabupaten di klik
$('#select-kabupaten').on('click', '.search-kecamatan', function () {
  let idKabupaten = $(this).data('id');

  $.getJSON(
    'https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=' +
      idKabupaten +
      '',
    function (data) {
      // hapus option select sebelumnya
      $('#select-kecamatan').empty();
      $('#select-kelurahan').empty();
      $('#select-kecamatan').html('<option>Pilih Kecamatan</option>');
      $('#select-kelurahan').html('<option>Pilih Kelurahan</option>');
      // masukan data ke select kecamatan
      $.each(data.kecamatan, function (_, value) {
        $('#select-kecamatan').append(
          `
        <option data-id="` +
            value.id +
            `" class="search-kelurahan" value="` +
            value.nama +
            `">` +
            value.nama +
            `</option>
        `
        );
      });
    }
  );
});

// ketika daftar kecamatan di klik
$('#select-kecamatan').on('click', '.search-kelurahan', function () {
  let idKecamatan = $(this).data('id');

  $.getJSON(
    'https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=' +
      idKecamatan +
      '',
    function (data) {
      // hapus option select sebelumnya
      $('#select-kelurahan').empty();
      $('#select-kelurahan').html('<option>Pilih Kelurahan</option>');
      // masukan data ke select kelurahan
      $.each(data.kelurahan, function (_, value) {
        $('#select-kelurahan').append(
          `
        <option value="` +
            value.nama +
            `">` +
            value.nama +
            `</option>
        `
        );
      });
    }
  );
});
