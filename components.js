// konfigurasi komponen router
const Home = {
  template: `<div>
            <h2>Home</h2>
            <p>Yolo this is Home</p>
            </div>`,
}
const About = {
  template: `<div>
            <h2>About</h2>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos culpa
            explicabo quis. Amet dolores nam rem dolore ea laudantium dicta,
            cupiditate consequuntur facere.
            </p>
            </div>`,
}
// local registration komponen
const Kelas = {
  props: ['items', 'klsbaru'],
  template: `<div>
        <h3>TAMBAH KELAS</h3>
        <form v-on:submit.prevent="submitkelas">
            <div class="input-group"><input type="text" v-model="kelas.judul" placeholder="Nama kelas">
              <div class="error" v-if="error.judul"><small>{{error.judul}}</small></div>
            </div>
            <div class="input-group">
                <label>Deskripsi: </label><br>
                <textarea v-model="kelas.deskripsi"></textarea>
                <div class="error" v-if="error.deskripsi"><small>{{error.deskripsi}}</small></div>
            </div>
            <div class="input-group">
                <img :src="previewimg" v-if="previewimg" width="200">
                <label>Masukan gambar: </label><br>
                <input type="file" ref="gambar" v-on:change="upload">
            </div>
            <button type="submit">Submit</button>
        </form>
        <hr />
        <h3>Daftar kelas {{ items.length }}</h3>
        <template v-if="items.length >= 1">
          <ul>
            <li v-for="(item,index) in items">
                <img :src="url_gambar(item.gambar)" width="200" />
                <p>
                {{ index+1 }} - {{ item.judul }}
                <a href="" v-on:click.prevent="$emit('hapuskelas', item.id)">Hapus</a>
                <router-link :to="'/kelas/' + item.id">Detail Kelas</router-link>
                </p>
              </li>
          </ul>
        </template>
        <ul v-else>
          Tidak ada kelas
        </ul></div>`,
  data: function () {
    return {
      kelas: {
        judul: '',
        deskripsi: '',
        gambar: '',
      },
      previewimg: '',
      error: {
        judul: '',
        deskripsi: '',
      },
    }
  },
  methods: {
    submitkelas: function () {
      this.error.judul = ''
      this.error.deskripsi = ''

      if (this.kelas.judul == '') {
        this.error.judul = 'Judul is Required'
      }
      if (this.kelas.deskripsi == '') {
        this.error.deskripsi = 'Deskripsi is Required'
      }
      if (this.kelas.judul && this.kelas.deskripsi) {
        const data = {
          id: uuidv4(),
          judul: this.kelas.judul,
          deskripsi: this.kelas.deskripsi,
          gambar: this.kelas.gambar,
        }
        this.$emit('submitkelas', data)
        this.kelas.judul = ''
        this.kelas.deskripsi = ''
        this.kelas.gambar = ''
        this.previewimg = ''
        this.$refs.gambar.value = ''
      }
    },
    upload: function (event) {
      const namaGambar = event.target.files[0].name
      this.kelas.gambar = namaGambar
      this.previewimg = URL.createObjectURL(event.target.files[0])
    },
    url_gambar: function (gambar) {
      return 'image/' + gambar
    },
  },
}
const NotFound = {
  template: `<div>
            <h2>404 Not Found</h2>
            <p>
            Halaman tidak tersedia
            </p>
            </div>`,
}
const detailKelas = {
  template: `<div>
          <template v-if="detailkelas">
            <h2>Detail Kelas</h2>
            <img :src="url_gambar(detailkelas.gambar)" width="200">
            <h1>{{ detailkelas.judul }} - {{ $route.params.id }}</h1>
            <p>{{ detailkelas.deskripsi }}</p>
            <router-link to="/kelas">Kembali</router-link>
          </template>
          <p v-else>Kelas tidak ada</p>
            </div>`,
  data() {
    return {
      detailkelas: {},
    }
  },
  created() {
    this.filterKelas()
  },
  methods: {
    filterKelas() {
      let id = this.$route.params.id
      let kelasDetailRef = database.ref('kelas/' + id)
      kelasDetailRef.on('value', (item) => {
        this.detailkelas = item.val()
      })
    },
    url_gambar: function (gambar) {
      return '../image/' + gambar
    },
  },
}
// konfigurasi komponen header dan footer~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Vue.component('header-component', {
  props: ['nama'],
  template: ` <header>
              <img src='../image/vuejslogo.svg' width='100px'>
              <p>{{ 'Framework ' +nama }}</p>
            </header>`,
  data: function () {
    return {
      pesan: 'Hello from data',
    }
  },
}),
  Vue.component('footer-component', {
    template: `
          <footer id="footer">
            <slot></slot>
          </footer>`, //untuk merender p didalam component footer,
  })
