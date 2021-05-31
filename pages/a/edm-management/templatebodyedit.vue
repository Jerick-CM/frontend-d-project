
<template>
  <div id="edm-header">
    <div class="container no-padding">
      <v-toolbar flat color="white" class="pt-4">
        <v-toolbar-title>EDM Template message body</v-toolbar-title>

        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <div class="container--flex container--flex-align-item-center"></div>
      </v-toolbar>

      <div class="container no-padding" style="background-color: white">
        <v-container fluid>
          <div>
            <nuxt-link

              :to="{
                path: '/a/edm-management/templatebody',
              }"
              >Go Back</nuxt-link
            >

            <form class="review-form" name="editfaq" @submit.prevent>

              <div class="faq col-md-12">
                <div>
                  <strong>{{ this.form_label }}</strong>
                </div>
              </div>

              <br />
              <div v-if="id == 1">
                <v-layout row wrap>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_locationdate"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>
                <br />
                <v-layout row>
                  <v-flex xs12>
                    <div v-if="this.image1previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image1previewstore"
                      >
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image1preview != ''">
                        image :
                        <v-img class="image-preview" :src="image1preview">
                        </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header</label>

                    <div class="form-group">
                      <input
                        type="file"
                        ref="image1"
                        v-on:change="handleFileUpload_image1()"
                      />
                    </div>


                    <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader1()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>


                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>

                  <v-textarea
                    rows="1"
                    v-model="href1"
                    label="image link 1"
                  ></v-textarea>
                  </v-flex>
                </v-layout>

                <br />
                <v-layout row>
                  <v-flex xs12>

                    <div v-if="this.image2previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image2previewstore"
                      />
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image2preview != ''">
                        image :
                         <v-img class="image-preview" :src="image2preview" /> </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header 2</label>
                    <div class="form-group">
                      <input
                        type="file"
                        ref="image2"
                        v-on:change="handleFileUpload_image2()"
                      />
                    </div>
                    <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader2()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>
                  <v-layout row wrap>
                  <v-flex xs12>

                  <v-textarea
                    rows="1"
                    v-model="href2"
                    label="image link 2"
                  ></v-textarea>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-textarea
                      rows="1"
                      v-model="form_subject"
                      label="E-mail Subject:"
                      @blur="$v.form_subject.$touch()"
                    ></v-textarea>
                    <template v-if="$v.form_subject.$error">
                      <p v-if="!$v.form_subject.required" class="errorMessage">
                        E-mail subject is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_content"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>
                <br />

              </div>
              <div v-if="id == 2">
                <v-layout row>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_locationdate"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>
                  <br/>
                <v-layout row>
                  <v-flex xs12>
                    <div v-if="this.image1previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image1previewstore"
                      >
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image1preview != ''">
                        image :
                        <v-img class="image-preview" :src="image1preview">
                        </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header</label>

                    <div class="form-group">
                      <input
                        type="file"
                        ref="image1"
                        v-on:change="handleFileUpload_image1()"
                      />
                    </div>
                    <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader1()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>

                  <v-textarea
                    rows="1"
                    v-model="href1"
                    label="image link 1"
                  ></v-textarea>
                  </v-flex>
                </v-layout>
                <br />
                <v-layout row>
                  <v-flex xs12>

                    <div v-if="this.image2previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image2previewstore"
                      />
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image2preview != ''">
                        image :
                         <v-img class="image-preview" :src="image2preview" /> </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header 2</label>
                    <div class="form-group">
                      <input
                        type="file"
                        ref="image2"
                        v-on:change="handleFileUpload_image2()"
                      />
                    </div>
                      <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader2()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>

                  <v-textarea
                    rows="1"
                    v-model="href2"
                    label="image link 2"
                  ></v-textarea>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-textarea
                      rows="1"
                      v-model="form_subject"
                      label="E-mail Subject:"
                      @blur="$v.form_subject.$touch()"
                    ></v-textarea>
                    <template v-if="$v.form_subject.$error">
                      <p v-if="!$v.form_subject.required" class="errorMessage">
                        E-mail subject is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_content"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>
                <br />

              </div>
              <div v-if="id == 3">
                <v-layout row>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_locationdate"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>
                <br/>
                <v-layout row>
                  <v-flex xs12>
                    <div v-if="this.image1previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image1previewstore"
                      >
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image1preview != ''">
                        image :
                        <v-img class="image-preview" :src="image1preview">
                        </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header</label>

                    <div class="form-group">
                      <input
                        type="file"
                        ref="image1"
                        v-on:change="handleFileUpload_image1()"
                      />
                    </div>
                    <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader1()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>
                 <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href1"
                    label="image link 1"
                    ></v-textarea>
                    </v-flex>
                </v-layout>
                <br />
                <v-layout row>
                  <v-flex xs12>

                    <div v-if="this.image2previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image2previewstore"
                      />
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image2preview != ''">
                        image :
                         <v-img class="image-preview" :src="image2preview" /> </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header 2</label>
                    <div class="form-group">
                      <input
                        type="file"
                        ref="image2"
                        v-on:change="handleFileUpload_image2()"
                      />
                    </div>
                      <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader2()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href2"
                    label="image link 2"
                    ></v-textarea>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-textarea
                      rows="1"
                      v-model="form_subject"
                      label="E-mail Subject:"
                      @blur="$v.form_subject.$touch()"
                    ></v-textarea>
                    <template v-if="$v.form_subject.$error">
                      <p v-if="!$v.form_subject.required" class="errorMessage">
                        E-mail subject is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>
                <br />

                 <v-layout row wrap>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_content"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>

              </div>
              <div v-if="id == 4">
                <v-layout row>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_locationdate"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>
                <br/>
                <v-layout row>
                  <v-flex xs12>
                    <div v-if="this.image1previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image1previewstore"
                      >
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image1preview != ''">
                        image :
                        <v-img class="image-preview" :src="image1preview">
                        </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header</label>

                    <div class="form-group">
                      <input
                        type="file"
                        ref="image1"
                        v-on:change="handleFileUpload_image1()"
                      />
                    </div>
                         <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader1()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href1"
                    label="image link 1"
                    ></v-textarea>
                    </v-flex>
                </v-layout>


                <br />

                <v-layout row>
                  <v-flex xs12>

                    <div v-if="this.image2previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image2previewstore"
                      />
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image2preview != ''">
                        image :
                         <v-img class="image-preview" :src="image2preview" /> </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header 2</label>
                    <div class="form-group">
                      <input
                        type="file"
                        ref="image2"
                        v-on:change="handleFileUpload_image2()"
                      />
                    </div>
                      <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader2()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href2"
                    label="image link 2"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-textarea
                      rows="1"
                      v-model="form_subject"
                      label="E-mail Subject:"
                      @blur="$v.form_subject.$touch()"
                    ></v-textarea>
                    <template v-if="$v.form_subject.$error">
                      <p v-if="!$v.form_subject.required" class="errorMessage">
                        E-mail subject is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_content"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>
                <br />

              </div>
              <div v-if="id == 5">
                <v-layout row>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_locationdate"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>
                <br/>

                <v-layout row>
                  <v-flex xs12>
                    <div v-if="this.image1previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image1previewstore"
                      >
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image1preview != ''">
                        image :
                        <v-img class="image-preview" :src="image1preview">
                        </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header</label>

                    <div class="form-group">
                      <input
                        type="file"
                        ref="image1"
                        v-on:change="handleFileUpload_image1()"
                      />
                    </div>
                         <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader1()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href1"
                    label="image link 1"
                    ></v-textarea>
                    </v-flex>
                </v-layout>

                <br />

                <v-layout row>
                  <v-flex xs12>

                    <div v-if="this.image2previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image2previewstore"
                      />
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image2preview != ''">
                        image :
                         <v-img class="image-preview" :src="image2preview" /> </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header 2</label>
                    <div class="form-group">
                      <input
                        type="file"
                        ref="image2"
                        v-on:change="handleFileUpload_image2()"
                      />
                    </div>
                      <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader2()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href2"
                    label="image link 2"
                    ></v-textarea>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-textarea
                      rows="1"
                      v-model="form_subject"
                      label="E-mail Subject:"
                      @blur="$v.form_subject.$touch()"
                    ></v-textarea>
                    <template v-if="$v.form_subject.$error">
                      <p v-if="!$v.form_subject.required" class="errorMessage">
                        E-mail subject is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_content"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>

                <br />

              </div>
              <div v-if="id == 6">
                <v-layout row>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_locationdate"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>
                <br/>
                <v-layout row>
                  <v-flex xs12>
                    <div v-if="this.image1previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image1previewstore"
                      >
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image1preview != ''">
                        image :
                        <v-img class="image-preview" :src="image1preview">
                        </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header</label>

                    <div class="form-group">
                      <input
                        type="file"
                        ref="image1"
                        v-on:change="handleFileUpload_image1()"
                      />
                    </div>
                         <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader1()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href1"
                    label="image link 1"
                    ></v-textarea>
                    </v-flex>
                </v-layout>

                <br />

                <v-layout row>
                  <v-flex xs12>

                    <div v-if="this.image2previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image2previewstore"
                      />
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image2preview != ''">
                        image :
                         <v-img class="image-preview" :src="image2preview" /> </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header 2</label>
                    <div class="form-group">
                      <input
                        type="file"
                        ref="image2"
                        v-on:change="handleFileUpload_image2()"
                      />
                    </div>
                      <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader2()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <v-flex xs12>

                      <v-textarea
                      rows="1"
                      v-model="href2"
                      label="image link 2"
                      ></v-textarea>
                    </v-flex>
                  </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-textarea
                      rows="1"
                      v-model="form_subject"
                      label="E-mail Subject:"
                      @blur="$v.form_subject.$touch()"
                    ></v-textarea>
                    <template v-if="$v.form_subject.$error">
                      <p v-if="!$v.form_subject.required" class="errorMessage">
                        E-mail subject is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_content"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>


                <br />

              </div>
              <div v-if="id == 7">
                <v-layout row>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_locationdate"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>
                <br/>

                <v-layout row>
                  <v-flex xs12>
                    <div v-if="this.image1previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image1previewstore"
                      >
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image1preview != ''">
                        image :
                        <v-img class="image-preview" :src="image1preview">
                        </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header</label>

                    <div class="form-group">
                      <input
                        type="file"
                        ref="image1"
                        v-on:change="handleFileUpload_image1()"
                      />
                    </div>
                         <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader1()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href1"
                    label="image link 1"
                    ></v-textarea>
                    </v-flex>
                </v-layout>


                <br />
                <v-layout row>
                  <v-flex xs12>

                    <div v-if="this.image2previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image2previewstore"
                      />
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image2preview != ''">
                        image :
                         <v-img class="image-preview" :src="image2preview" /> </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header 2</label>
                    <div class="form-group">
                      <input
                        type="file"
                        ref="image2"
                        v-on:change="handleFileUpload_image2()"
                      />
                    </div>
                      <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader2()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href2"
                    label="image link 2"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-textarea
                      rows="1"
                      v-model="form_subject"
                      label="E-mail Subject:"
                      @blur="$v.form_subject.$touch()"
                    ></v-textarea>
                    <template v-if="$v.form_subject.$error">
                      <p v-if="!$v.form_subject.required" class="errorMessage">
                        E-mail subject is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_content"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>

                <br />


              </div>
              <div v-if="id == 8">
                <v-layout row>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_locationdate"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>
                <br />

                <v-layout row>
                  <v-flex xs12>
                    <div v-if="this.image1previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image1previewstore"
                      >
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image1preview != ''">
                        image :
                        <v-img class="image-preview" :src="image1preview">
                        </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header</label>

                    <div class="form-group">
                      <input
                        type="file"
                        ref="image1"
                        v-on:change="handleFileUpload_image1()"
                      />
                    </div>

                    <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader1()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>

                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href1"
                    label="image link 1"
                    ></v-textarea>
                    </v-flex>
                </v-layout>

                <br />
                <v-layout row>
                  <v-flex xs12>

                    <div v-if="this.image2previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image2previewstore"
                      />
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image2preview != ''">
                        image :
                         <v-img class="image-preview" :src="image2preview" /> </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header 2</label>
                    <div class="form-group">
                      <input
                        type="file"
                        ref="image2"
                        v-on:change="handleFileUpload_image2()"
                      />
                    </div>
                      <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader2()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href2"
                    label="image link 2"
                    ></v-textarea>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-textarea
                      rows="1"
                      v-model="form_subject"
                      label="E-mail Subject:"
                      @blur="$v.form_subject.$touch()"
                    ></v-textarea>
                    <template v-if="$v.form_subject.$error">
                      <p v-if="!$v.form_subject.required" class="errorMessage">
                        E-mail subject is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>
                <br />


                <v-layout row>
                  <v-flex xs12>
                    <client-only placeholder="loading...">
                      <ckeditor-nuxt
                        v-model="form_content"
                        @blur="$v.form_content.$touch()"
                        :config="editorConfig"
                      />
                    </client-only>

                    <template v-if="$v.form_content.$error">
                      <p v-if="!$v.form_content.required" class="errorMessage">
                        Content is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>
              </div>
              <div v-if="id == 9">
                <v-layout row>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_locationdate"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>
                <br/>
                <v-layout row>
                  <v-flex xs12>
                    <div v-if="this.image1previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image1previewstore"
                      >
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image1preview != ''">
                        image :
                        <v-img class="image-preview" :src="image1preview">
                        </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header</label>
                    <div class="form-group">
                      <input
                        type="file"
                        ref="image1"
                        v-on:change="handleFileUpload_image1()"
                      />
                    </div>
                         <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader1()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href1"
                    label="image link 1"
                    ></v-textarea>
                    </v-flex>
                </v-layout>


                <br />
                <v-layout row>
                  <v-flex xs12>

                    <div v-if="this.image2previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image2previewstore"
                      />
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image2preview != ''">
                        image :
                         <v-img class="image-preview" :src="image2preview" /> </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header 2</label>
                    <div class="form-group">
                      <input
                        type="file"
                        ref="image2"
                        v-on:change="handleFileUpload_image2()"
                      />
                    </div>
                      <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader2()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href2"
                    label="image link 2"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
                <br />
                <v-layout row class='d-none'>
                  <v-flex xs12>
                    <v-textarea
                      rows="1"
                      v-model="form_label"
                      label="EDM Title:"
                      @blur="$v.form_label.$touch()"
                    ></v-textarea>

                    <template v-if="$v.form_label.$error">
                      <p v-if="!$v.form_label.required" class="errorMessage">
                        Edm title is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-textarea
                      rows="1"
                      v-model="form_subject"
                      label="E-mail Subject:"
                      @blur="$v.form_subject.$touch()"
                    ></v-textarea>
                    <template v-if="$v.form_subject.$error">
                      <p v-if="!$v.form_subject.required" class="errorMessage">
                        E-mail subject is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <client-only placeholder="loading...">
                      <ckeditor-nuxt
                        v-model="form_content"
                        @blur="$v.form_content.$touch()"
                        :config="editorConfig"
                      />
                    </client-only>
                    <template v-if="$v.form_content.$error">
                      <p v-if="!$v.form_content.required" class="errorMessage">
                        Content is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>
              </div>
              <div v-if="id > 9">
                <v-layout row>
                  <v-flex xs12>
                    <ckeditor-nuxt
                      v-model="form_locationdate"
                      :config="editorConfig"
                    />
                  </v-flex>
                </v-layout>
                <br />
                <v-layout row class="">
                  <v-flex xs12>
                    <div v-if="this.image1previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image1previewstore"
                      >
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image1preview != ''">
                        image :
                        <v-img class="image-preview" :src="image1preview">
                        </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header</label>

                    <div class="form-group">
                      <input
                        type="file"
                        ref="image1"
                        v-on:change="handleFileUpload_image1()"
                      />
                    </div>
                         <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader1()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href1"
                    label="image link 1"
                    ></v-textarea>
                    </v-flex>
                </v-layout>
                <br />
                <v-layout row class="">
                  <v-flex xs12>

                    <div v-if="this.image2previewstore != ''">
                      <v-img
                        class="image-preview"
                        v-bind:src="this.url + '/' + this.image2previewstore"
                      />
                      </v-img>
                    </div>
                    <div v-else>
                      <div v-if="this.image2preview != ''">
                        image :
                         <v-img class="image-preview" :src="image2preview" /> </v-img>
                      </div>
                    </div>
                    <br />
                    <label>Top Header 2</label>
                    <div class="form-group">
                      <input
                        type="file"
                        ref="image2"
                        v-on:change="handleFileUpload_image2()"
                      />
                    </div>
                      <div >
                      <label
                        onclick="return false"
                        v-on:click="removeheader2()"
                        class="red-font"
                        >Remove</label
                      >
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>

                    <v-textarea
                    rows="1"
                    v-model="href2"
                    label="image link 2"
                    ></v-textarea>
                    </v-flex>
                </v-layout>
                <br />
                <v-layout row class="d-none">
                  <v-flex xs12>
                    <v-textarea
                      rows="1"
                      v-model="form_label"
                      label="EDM Title:"
                      @blur="$v.form_label.$touch()"
                    ></v-textarea>
                    <template v-if="$v.form_label.$error">
                      <p v-if="!$v.form_label.required" class="errorMessage">
                        Edm title is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-textarea
                      rows="1"
                      v-model="form_subject"
                      label="E-mail Subject:"
                      @blur="$v.form_subject.$touch()"
                    ></v-textarea>
                    <template v-if="$v.form_subject.$error">
                      <p v-if="!$v.form_subject.required" class="errorMessage">
                        E-mail subject is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <client-only placeholder="loading...">
                      <ckeditor-nuxt
                        v-model="form_content"
                        @blur="$v.form_content.$touch()"
                        :config="editorConfig"
                      />
                    </client-only>
                    <template v-if="$v.form_content.$error">
                      <p v-if="!$v.form_content.required" class="errorMessage">
                        Content is required.
                      </p>
                    </template>
                  </v-flex>
                </v-layout>
              </div>
              <v-layout row>
                <v-flex xs12>
                  <v-btn
                    color="blue"
                    :disable="$v.$invalid"
                    :disabled="submitted"
                    @click="onSubmit"
                    v-bind:loading="isSaving"
                  >
                    <input class="white-font" type="submit" value="Save" />
                  </v-btn>
                  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <template v-slot:activator="{ on }">
                      <v-btn  dark v-on="on"  color="success" v-on:click="loadpreview()">
                            <label class="white-font">Preview</label>
                        </v-btn>
                    </template>
                    <v-card>
                      <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                          <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Preview</v-toolbar-title>
                        <v-spacer></v-spacer>
                      </v-toolbar>
                      <v-container fluid>
                         <v-layout row>
                          <v-flex xs12>
                          <div v-html="previewTemplate"></div>
                          </v-flex>
                          </v-layout>
                      </v-container>
                    </v-card>
                  </v-dialog>
                </v-flex>
              </v-layout>
            </form>
            <br />
            <label v-if="id == 9" class="d-none"><strong>Mass Token Update</strong></label
            ><br />
            <v-divider v-if="id == 9" class="mx-2 d-none" inset vertical></v-divider>
            <v-spacer class="d-none" v-if="id == 9"></v-spacer>
            <div class="d-none" v-if="id == 9">
              <v-layout row>
                <v-flex xs12>
                  <input
                    style="display: none"
                    type="file"
                    ref="csv_masstokenupload"
                    v-on:change="handlecsv_upload"
                  />
                  <v-btn color="primary" @click="onPickFile_masstokenupdate"
                    >Select file</v-btn
                  >
                  {{ filename_masstokenupdate }}
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                    <div v-html="previewTemplate"></div>
                  </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                    <div style="white-space: pre;color:red">{{ report_upload }}</div>
                </v-flex>
              </v-layout>


              <v-layout row>
                <v-btn
                  v-if="id == 9"
                  color="success"
                  v-on:click="fireSendEmail_masstokenupdate()"
                  v-bind:loading="isMassUploadProcess"
                  :disabled="masstoken_error"
                >
                  <label class="white-font">Process</label>
                </v-btn>

              </v-layout>
            </div>

            <v-layout row v-if="id > 9">
              <v-combobox
                v-model="emails"
                :items="items"
                :disabled="comboBoxDisabled"
                @change="checkLastInput"
                item-text="name"
                item-value="email"
                multiple
                chips
                deletable-chips
                label="Select emails to send"
              ></v-combobox>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="*/*"
                @change="onFilePicked"
              />
            </v-layout>
            <v-layout row v-if="id > 9">
              <v-btn color="primary" @click="onPickFile">Select file</v-btn>
              <v-chip v-show="filename != ''">
                {{ filename }}
              </v-chip>
            </v-layout>
            <v-btn
              v-if="id > 9"
              color="success"
              v-on:click="fireSendEmail()"
              v-bind:loading="sendEmailLoading"
            >
              <label class="white-font">Send Email</label>
            </v-btn>
            <div style="white-space: pre">{{ report }}</div>
          </div>
        </v-container>
      </div>
      <div class="controls m-lg-vertical"></div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
var url = process.env.API_URL;
var timezone = process.env.TIMEZONE;

import adminPage from "~/mixins/admin-page.js";
import dateToFromPicker from "~/mixins/dateToFromPicker.js";
import downloadExcel from "~/mixins/downloadExcel.js";
import { mapGetters } from "vuex";

import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import { required } from "vuelidate/lib/validators";
import Papa from "papaparse";

import juice from "juice";
import ckeditor5const from "~/mixins/ckeditor5const";

export default {
  watch: {
    form_content: function (val) {
      if (this.$route.query.edit == 6) {
        this.contentcopy = "";
      } else {
        this.contentcopy = val;
      }
    },
  },
  async mounted() {
    const { data } = await this.$axios.get("/users", {
      params: {
        page: 1,
        paginate: 0,
        sort: "name:asc",
        blast: 1,
      },
    });
    this.items = data;
  },
  head() {
    return {
      script: [],
      link: [],
    };
  },
  components: {
    "ckeditor-nuxt": () =>
      import("@engrjerickcmangalus/ckeditor-nuxt-custom-build-simpleuploader"),
  },
  validations: {
    form_label: { required },
    // form_title: { required },
    form_subject: { required },
    form_content: { required },
  },
  data: () => ({
    categories: [],
    categorieslist: [],
    comboBoxDisabled: false,
    contentcopy: "",
    csv_masstokenupload: "",
    dbOptions: [],
    dbSelect: null,
    dialog: false,
    editorConfig: [],
    edmID: null,
    email_recipient: null,
    emails: "",
    emails_masstokenupdate: "",
    emailtest: "",
    errors: [],
    fileLoading: false,
    filename: "",
    filename_masstokenupdate: "",
    filenameSelected: false,
    filenameSelected_masstokenupdate: false,
    fileObject: null,
    form_content: null,
    form_id: null,
    form_label: null,
    form_locationdate: null,
    form_subject: null,
    form_title: null,
    id: null,
    image1: null,
    image1preview: "",
    image1previewstore: "",
    image2: null,
    image2preview: "",
    image2previewstore: "",
    isMassUploadProcess: false,
    isSaving: false,
    items: [""],
    items_masstokenupdate: [""],
    masstoken_error: false,
    notifications: false,
    previewTemplate: "",
    previewTemplate: "",
    report: "",
    report_upload: "",
    sendEmailLoading: false,
    sound: true,
    submitted: false,
    token: null,
    url: null,
    widgets: false,
  }),
  async created() {
    this.url = url;
    this.token = this.sessionToken;
    this.timezone = timezone;
    this.id = this.$route.query.edit;
    this.editorConfig = {
      simpleUpload: {
        uploadUrl: url + "/" + "api/edm-body/ckeditor",
        headers: {
          Accept: "application/json",
          Timezone: this.timezone,
          Authorization: "Bearer " + this.token,
        },
      },
    };
    // this.id = this.$route.query.edit;
    // this.editorConfig = {};
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    try {
      const response = await this.$axios.get("/api/search-edm-templatebody", {
        headers: {
          Accept: "application/json",
        },
        params: {
          id: this.$route.query.edit,
        },
      });

      this.form_locationdate = response.data[0]["locationdate"];
      this.form_content = response.data[0]["content"];
      this.form_label = response.data[0]["label"];
      // this.form_title = response.data[0]["title"];
      this.form_subject = response.data[0]["subject"];
      this.form_id = response.data[0]["id"];

      this.placeholder1 = response.data[0]["placeholder1"];
      this.placeholder2 = response.data[0]["placeholder2"];
      this.placeholder3 = response.data[0]["placeholder3"];
      this.placeholder4 = response.data[0]["placeholder4"];
      this.placeholder5 = response.data[0]["placeholder5"];

      this.placeholder6 = response.data[0]["placeholder6"];
      this.placeholder7 = response.data[0]["placeholder7"];
      this.placeholder8 = response.data[0]["placeholder8"];
      this.placeholder9 = response.data[0]["placeholder9"];
      this.placeholder10 = response.data[0]["placeholder10"];

      this.placeholder11 = response.data[0]["placeholder11"];
      this.placeholder12 = response.data[0]["placeholder12"];
      this.placeholder13 = response.data[0]["placeholder13"];
      this.placeholder14 = response.data[0]["placeholder14"];
      this.placeholder15 = response.data[0]["placeholder15"];

      this.placeholder16 = response.data[0]["placeholder16"];
      this.placeholder17 = response.data[0]["placeholder17"];
      this.placeholder18 = response.data[0]["placeholder18"];
      this.placeholder19 = response.data[0]["placeholder19"];
      this.placeholder20 = response.data[0]["placeholder20"];

      this.placeholder21 = response.data[0]["placeholder21"];
      this.placeholder22 = response.data[0]["placeholder22"];
      this.placeholder23 = response.data[0]["placeholder23"];
      this.placeholder24 = response.data[0]["placeholder24"];
      this.placeholder25 = response.data[0]["placeholder25"];

      this.placeholder26 = response.data[0]["placeholder26"];
      this.placeholder27 = response.data[0]["placeholder27"];

      this.image1previewstore = response.data[0]["header1"];
      this.image2previewstore = response.data[0]["header2"];

      this.image1 = response.data[0]["header1"];
      this.image2 = response.data[0]["header2"];

      this.href1 = response.data[0]["href1"];
      this.href2 = response.data[0]["href2"];
    } catch (error) {}
  },
  mixins: [adminPage],
  computed: {
    ...mapGetters({
      profile: "session/GET_PROFILE",
      sessionToken: "session/GET_TOKEN",
    }),
  },
  methods: {
    loadpreview() {
      switch (parseInt(this.$route.query.edit)) {
        case 1:
          this.edmID = 1;
          //1 MESSAGE SEND
          break;
        case 2:
          //2 MESSAGE RECEIVED
          this.edmID = 2;
          break;
        case 3:
          // 6 MESSAGE SEND TOKEN
          // this.edmID = 6;
          this.edmID = 6;
          break;
        case 4:
          // 5 MESSAGE RECEIVE TOKEN
          // this.edmID = 5;
          this.edmID = 5;
          break;
        case 5:
          // 4 WELCOME
          this.edmID = 4;
          break;
        case 6:
          this.edmID = 7;
          // 7 MONTHLY SUMMARY
          break;
        case 7:
          this.edmID = 3;
          //3 REDEMPTION

          break;
        case 8:
          this.edmID = 8;
          //8 TIER
          break;
        default:
          this.edmID = this.id;
          break;
      }
      let payload = new FormData();
      payload.append("content", this.form_content);
      payload.append("editpreview", true);
      this.$axios
        .post(`/admin/edm/` + this.edmID, payload)
        .then((res) => {
          // this.previewTemplate = res.data;
          this.previewTemplate = res.data;
        })
        .catch((err) => {
          this.$toast.error(err.response.message);
        })
        .finally(() => {
          this.isFetching = false;
        });
    },
    onPickFile() {
      this.$refs.fileInput.value = null;
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      if (files[0] !== undefined) {
        this.filename = files[0].name;
        this.filenameSelected = true;
        Papa.parse(files[0], {
          complete: this.applyCsv,
        });
      } else {
        this.comboBoxDisabled = false;
        this.fileName = "";
        this.filenameSelected = false;
      }
    },
    async applyCsv(results, file) {
      var emails = this.emails;
      var uniqueEmails = [];
      var duplicateEmails = [];
      var missingEmails = [];
      if (!emails) {
        emails = [];
      }
      for (var i = results.data.length - 1; i >= 0; i--) {
        if (results.data[i][0]) {
          const found = this.items.find(
            (element) => element.email == results.data[i][0]
          );
          if (found) {
            if (
              !emails.length ||
              !emails.find((element) => element.email == results.data[i][0])
            ) {
              emails.push(found);
              uniqueEmails.push(results.data[i][0]);
            } else {
              duplicateEmails.push(results.data[i][0]);
            }
          } else {
            missingEmails.push(results.data[i][0]);
          }
        }
      }

      this.report =
        `Unique emails: (` +
        uniqueEmails.length +
        `)` +
        uniqueEmails.join(", ") +
        `\n` +
        `Duplicate emails: ` +
        ` (` +
        duplicateEmails.length +
        `)` +
        duplicateEmails.join(", ") +
        `\n` +
        `Email with no user: ` +
        ` (` +
        missingEmails.length +
        `) ` +
        missingEmails.join(", ") +
        `\n`;
      this.emails = emails;
    },
    fireSendEmail() {
      var fileSelected = this.comboBoxDisabled;
      var file = null;
      var emails = [];
      var formData = new FormData();
      this.sendEmailLoading = true;
      if (fileSelected) {
        file = this.$refs.fileInput.files[0];
        formData.append("emailFile", file);
        console.log("file");
      } else if (this.emails.length) {
        console.log("file2");
        this.emails.forEach(function (item, index) {
          emails.push(item.email);
        });
        formData.append("emails", emails);
      }
      if (emails.length) {
        this.$axios
          .post("/admin/edm/send_blast/" + this.id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(async (res) => {
            this.sendEmailLoading = false;
            this.$toast.success("Send sent success fully.");
            this.report = "";
            this.emails = [];
          })
          .catch((error) => {
            this.$toast.error("Email sending error.");
            this.sendEmailLoading = false;
          })
          .finally(() => {});
      } else {
        this.sendEmailLoading = false;
        this.$toast.error("Input an email");
      }
    },
    checkLastInput() {
      if (this.emails.length > 0) {
        var lastIndex = this.emails.length - 1;
        var email = this.emails[lastIndex];
        if (typeof email !== "object") {
          this.emails.pop();
        }
      }
    },
    onClickSaveButton() {
      console.log(this.isSaving);
    },
    onSubmit() {
      console.log(this.isSaving);
      if (this.isSaving) {
        return;
      }
      this.isSaving = true;
      var profile_id = this.profile.id;
      var name = this.profile.name;
      let payload = new FormData();

      this.form_content = juice.inlineContent(
        this.form_content,
        ckeditor5const.styles
      );

      console.log(this.form_content);
      // this.form_locationdate = juice.inlineContent(
      //   this.form_locationdate,
      //   ckeditor5const.styles
      // );

      payload.append("locationdate", this.form_locationdate);
      payload.append("content", this.form_content);
      payload.append("label", this.form_label);
      // payload.append("title", this.form_title);
      payload.append("subject", this.form_subject);

      payload.append("href1", this.href1);
      payload.append("href2", this.href2);

      payload.append("table_id", this.form_id);
      payload.append("header1", this.image1);
      payload.append("header2", this.image2);

      payload.append("placeholder1", this.placeholder1);
      payload.append("placeholder2", this.placeholder2);
      payload.append("placeholder3", this.placeholder3);
      payload.append("placeholder4", this.placeholder4);
      payload.append("placeholder5", this.placeholder5);

      payload.append("placeholder6", this.placeholder6);
      payload.append("placeholder7", this.placeholder7);
      payload.append("placeholder8", this.placeholder8);
      payload.append("placeholder9", this.placeholder9);
      payload.append("placeholder10", this.placeholder10);

      payload.append("placeholder11", this.placeholder11);
      payload.append("placeholder12", this.placeholder12);
      payload.append("placeholder13", this.placeholder13);
      payload.append("placeholder14", this.placeholder14);
      payload.append("placeholder15", this.placeholder15);

      payload.append("placeholder16", this.placeholder16);
      payload.append("placeholder17", this.placeholder17);
      payload.append("placeholder18", this.placeholder18);
      payload.append("placeholder19", this.placeholder19);
      payload.append("placeholder20", this.placeholder20);

      payload.append("placeholder21", this.placeholder21);
      payload.append("placeholder22", this.placeholder22);
      payload.append("placeholder23", this.placeholder23);
      payload.append("placeholder24", this.placeholder24);
      payload.append("placeholder25", this.placeholder25);

      payload.append("placeholder26", this.placeholder26);
      payload.append("placeholder27", this.placeholder27);

      payload.append("id", this.id);
      payload.append("profile_id", profile_id);
      payload.append("name", name);

      this.submitted = true;

      this.$axios
        .post("/api/update-edm-templatebody", payload)
        .then((res) => {
          this.isSaving = false;
          this.submitted = false;
          this.$toast.success("Save is done");
        })
        .catch((error) => {
          this.isSaving = false;
          this.submitted = false;
        })
        .finally(() => {});
    },
    onPickFile_masstokenupdate() {
      this.$refs.csv_masstokenupload.value = null;
      this.$refs.csv_masstokenupload.click();
    },

    fireSendEmail_masstokenupdate() {
      var file = null;
      var emails = [];
      var formData = new FormData();
      this.isMassUploadProcess = true;

      formData.append("csv_masstokenupload", this.csv_masstokenupload);

      this.$axios
        .post("/admin/edm/masstokenupdate/" + this.id, formData, {})
        .then(async (res) => {
          console.log(res);
          this.isMassUploadProcess = false;
          this.$toast.success("Mass Token Upload success.");

          // const confirmPopupOpts = {
          //   title: "Mass Upload Token Process is done.",
          //   buttonTrueText: "Close",
          //   buttonTrueColor: "light-green lighten-1",
          //   color: "black",
          //   icon: "",
          // };

          // let isConfirm = await this.$confirm(
          //   `
          // <div class="center">
          //   Unique emails sent: ` +
          //     res.data.unique_email_count +
          //     `<br />
          //   Duplicate emails: ` +
          //     res.data.duplicate_email_count +
          //     `<br />
          //   Email with no user: ` +
          //     res.data.missing +
          //     `<br />
          //   Inactive  user: ` +
          //     res.data.inactive_user +
          //     `
          // </div>
          // `,
          //   confirmPopupOpts
          // );
        })
        .catch((error) => {
          this.isMassUploadProcess = false;
          if (error.response.data["errormsg"]) {
            this.$toast.error(error.response.data["errormsg"]);
          } else {
            this.$toast.error("Mass Token Upload error.");
          }

          // if (error.response.data.erromsg) {
          //   this.$toast.error(error.response.data.erromsg);
          // } else {
          //   this.$toast.error("Mass Token Upload error.");
          // }
        })
        .finally(() => {});
    },
    async applyCsvupload(results, file) {
      this.masstoken_error = false;
      this.report_upload = "";
      var stored_emails = [];
      var duplicate_emails = [];
      var missingEmails = [];
      var emails = this.emails;

      var table = "<table ' style='border: 1px solid #ddd;' class='preview'>";

      for (var i = 0; i < results.data.length; i++) {
        if (results.data[i][1]) {
          var error = false;
          if (i > 0) {
            const found = this.items.find(
              (element) => element.email == results.data[i][0]
            );

            if (!found) {
              missingEmails.push(results.data[i][0]);
            }

            if (results.data[i][0] == "") {
              this.masstoken_error = true;
              error = true;
            }

            if (results.data[i][1] == "") {
              this.masstoken_error = true;
              error = true;
            }

            if (results.data[i][2] == "") {
              this.masstoken_error = true;
              error = true;
            }

            if (results.data[i][3] == "") {
              this.masstoken_error = true;
              error = true;
            }

            if (results.data[i][4] == "") {
              this.masstoken_error = true;
              error = true;
            }
          }
          if (i == 0) {
          } else {
            if (Number.isInteger(parseFloat(results.data[i][1]))) {
            } else {
              this.masstoken_error = true;
              error = true;
            }
          }
          if (i == 0) {
          } else {
            if (Number.isInteger(parseFloat(results.data[i][2]))) {
            } else {
              this.masstoken_error = true;
              error = true;
            }
          }

          if (i == 0) {
          } else {
            if (Number.isInteger(parseFloat(results.data[i][3]))) {
            } else {
              this.masstoken_error = true;
              error = true;
            }
          }

          if (i == 0) {
          } else {
            if (Number.isInteger(parseFloat(results.data[i][4]))) {
            } else {
              this.masstoken_error = true;
              error = true;
            }
          }

          table += "<tr>";

          if (error == true) {
            table +=
              "<td style='border: 1px solid #ddd;border-left: 1px solid red;border-bottom: 1px solid red;border-top: 1px solid red;text-align: left;padding: 8px;'>";
          } else {
            table +=
              "<td style='border: 1px solid #ddd;text-align: left;padding: 8px;'>";
          }

          table += results.data[i][0];
          table += "</td>";

          if (error == true) {
            table +=
              "<td style='border: 1px solid #ddd;border-bottom: 1px solid red;border-top: 1px solid red;text-align: left;padding: 8px;'>";
          } else {
            table +=
              "<td style='border: 1px solid #ddd;text-align: left;padding: 8px;'>";
          }

          table += results.data[i][1];
          table += "</td>";

          if (error == true) {
            table +=
              "<td style='border: 1px solid #ddd;border-bottom: 1px solid red;border-top: 1px solid red;text-align: left;padding: 8px;'>";
          } else {
            table +=
              "<td style='border: 1px solid #ddd;text-align: left;padding: 8px;'>";
          }

          table += results.data[i][2];
          table += "</td>";

          if (error == true) {
            table +=
              "<td style='border: 1px solid #ddd;border-bottom: 1px solid red;border-top: 1px solid red;text-align: left;padding: 8px;'>";
          } else {
            table +=
              "<td style='border: 1px solid #ddd;text-align: left;padding: 8px;'>";
          }

          table += results.data[i][3];
          table += "</td>";

          if (error == true) {
            table +=
              "<td style='border: 1px solid #ddd;border-bottom: 1px solid red;border-top: 1px solid red;text-align: left;padding: 8px;'>";
          } else {
            table +=
              "<td style='border: 1px solid #ddd;text-align: left;padding: 8px;'>";
          }

          table += results.data[i][4];
          table += "</td>";

          if (error == true) {
            table +=
              "<td style='border: 1px solid #ddd;border-bottom: 1px solid red;border-top: 1px solid red;text-align: left;padding: 8px;'>";
          } else {
            table +=
              "<td style='border: 1px solid #ddd;text-align: left;padding: 8px;'>";
          }

          table += results.data[i][5];
          table += "</td>";

          if (error == true) {
            table +=
              "<td style='border: 1px solid #ddd;border-bottom: 1px solid red;border-top: 1px solid red;text-align: left;padding: 8px;'>";
          } else {
            table +=
              "<td style='border: 1px solid #ddd;text-align: left;padding: 8px;'>";
          }
          table += results.data[i][6];
          table += "</td>";

          if (error == true) {
            table +=
              "<td style='border: 1px solid #ddd;border-right: 1px solid red;border-bottom: 1px solid red;border-top: 1px solid red;text-align: left;padding: 8px;'>";
          } else {
            table +=
              "<td style='border: 1px solid #ddd;text-align: left;padding: 8px;'>";
          }

          table += results.data[i][7];
          table += "</td>";

          table += "</tr>";
        }
      }

      table += "</table>";

      if (missingEmails.length == 0) {
      } else {
        this.report_upload =
          `Email with no user: ` +
          ` (` +
          missingEmails.length +
          `) ` +
          missingEmails.join(", ") +
          `\n`;
      }

      if (this.masstoken_error == true) {
        this.$toast.error(
          "Unable to process because there's on the data, please update and reupload the csv"
        );
      }
      this.previewTemplate = table;
    },
    handlecsv_upload(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        Papa.parse(files[0], {
          complete: this.applyCsvupload,
        });
      }
      try {
        const file = this.$refs.csv_masstokenupload.files[0];

        this.csv_masstokenupload = this.$refs.csv_masstokenupload.files[0];
        this.filename_masstokenupdate = this.$refs.csv_masstokenupload.files[0].name;
        console.log(this.filename_masstokenupdate);
      } catch (err) {
        console.log(err);
      }
    },

    testmonthlysending() {
      var formData = new FormData();
      formData.append("email", this.emailtest);
      this.$axios
        .post("/admin/edm/testmonthlyedm/" + this.id, formData, {})
        .then(async (res) => {})
        .catch((error) => {
          this.isMassUploadProcess = false;
          this.$toast.error("Mass Token Upload error.");
        })
        .finally(() => {});
    },
    handleFileUpload_image1(e) {
      try {
        const file = this.$refs.image1.files[0];
        this.image1preview = URL.createObjectURL(file);
        this.image1 = this.$refs.image1.files[0];
        this.image1previewstore = "";
      } catch (err) {
        console.log(err);
      }
    },
    handleFileUpload_image2(e) {
      try {
        const file = this.$refs.image2.files[0];

        this.image2preview = URL.createObjectURL(file);

        this.image2 = this.$refs.image2.files[0];
        this.image2previewstore = "";
      } catch (err) {
        console.log(err);
      }
    },
    removeheader1() {
      this.$refs.image1.value = null;
      this.image1previewstore = "";
      this.image1 = "";
      this.image1preview = "";
    },
    removeheader2() {
      this.$refs.image2.value = null;
      this.image2previewstore = "";
      this.image2 = "";
      this.image2preview = "";
    },
  },
};
</script>
<style lang="css" scoped>
.ck-editor__editable {
  min-height: 500px;
}
.errorMessage {
  color: red;
}
.white-font {
  color: white;
}
.red-font {
  color: red;
}
table.preview {
  border: 1px solid black;
}
</style>

<style lang="scss" scoped>
@import "~/assets/scss/vue/pages/admin/user-transactions.scss";
</style>
