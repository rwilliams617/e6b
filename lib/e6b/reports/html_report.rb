class E6b::Reports::HtmlReport < Report
   
 def initialize(**args)
   super args
 end 

 def make_report
   @io = StringIO.new
   make_html_head
   make_headings
   make_rows
   make_html_closing_tags
   @io.string
 end

 def make_html_head
   @io.puts "<!DOCTYPE html>"
   @io.puts "<html>"
   @io.puts "  <body>"
   @io.puts "    <table>"
 end

 def make_headings
   @io.puts "      <thead>"
   @io.puts "        <tr>"
   @headings.each do |heading|
     @io.puts "<th>#{heading}</th>"
   end
   @io.puts "        </tr>"
   @io.puts "      </thead>"
 end


 def make_rows
   @io.puts "      <tbody>"
   @rows.each do |row|
     @io.puts "        <tr>"
     row.each do |cell|
       @io.puts "<td>#{cell}</td>"
     end
     @io.puts "        </tr>"
   end
   @io.puts "      </tbody>"
 end

 def make_html_closing_tags
   @io.puts "    </table>"
   @io.puts "  </body>"
   @io.puts "</html>"
 end

end