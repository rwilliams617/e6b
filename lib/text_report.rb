class TextReport < Report

	# def make_report
	# 	@io = StringIO.new
	# 	make_headings
	# 	make_rows
	# 	@io.string 
 #  end

 	private
  def make_headings 
    @io.puts self.line
    @io << headings.map { |heading| heading.ljust(column_width) }.join(separator)
    @io.puts separator.rstrip
    @io.puts self.line
	end

	def make_rows
		@rows.each do |row|
    @io << row.map { |cell| cell.to_s.ljust(column_width) }.join(separator)
    @io.puts separator.rstrip
    @io.puts line("-")
		end
	end

  #table_lines
  def line(style = "=")
    column_nb = headings.count

    total_width = column_width * column_nb + column_nb * separator.length
    style * total_width
  end

  def headings
    ["Flight No","Airline","From","Estimated arrival time"]
  end
    
  def separator
    " | "
  end

  def column_width
    headings.map { |item| item.length }.max
  end
end


