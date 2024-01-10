const path= require('path');
const HtmlWebpackPlugin= require('html-webpack-plugin');

module.exports={

   entry: './src/index.js',
   //entry:path.resolve(__dirname,'..','./src/index.js') ,

   output:{
       path:path.join(__dirname, '/dist'),
      //entry:path.resolve(__dirname,'..','./dist') ,
       filename: 'bundle.js'
   },

   devServer:{
       port:3002
   },

   plugins:[
       new HtmlWebpackPlugin({
           template: './src/index.html'
          // template: path.resolve(__dirname,'..','./src/index.html')
       })
   ],

   module:{
       rules:[
           {
               test:/.js$/,
               exclude: /node_modules/,
               use:{
                   loader:'babel-loader',
                   options:{
                       presets:['@babel/preset-env','@babel/preset-react']
                   }
               }
           },

           {
               test: /\.css$/,
               use: [
                   { loader: 'style-loader' },
                   { loader: 'css-loader' }
               ]
             }
       ]
   }
}