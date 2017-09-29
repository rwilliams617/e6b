class E6b::TextReport < Report

 	protected
  def make_headings 
    @io.puts line
    @io << headings.map { |heading| heading.ljust(column_width) }.join(separator)
    @io.puts separator.rstrip
    @io.puts line
	end

	def make_rows
		@rows.each do |row|
    @io << row.map { |cell| cell.to_s.ljust(column_width) }.join(separator)
    @io.puts separator.rstrip
    @io.puts line("-")
		end
	end

  private
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


