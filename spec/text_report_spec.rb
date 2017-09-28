require_relative 'spec_helper'


describe Report do

  describe "TextReport" do
    before do
      @report = TextReport.new(headings: ["Flight No.", "Airline", "From", "Estimated Arrival Time"],
      rows: [["BA-12345", "British Airways", "LHR", "21:47"], ["AL-666", "Alitalia", "LHR", "06:00"]],
      sort_strategy: AirlineSort.new(sorting_order: :asc))  
    end

    it "should display the flight list in text format sorted by airlines, ascending" do
      expected = <<-REPORT
====================================================================================================
Flight No              | Airline                | From                   | Estimated arrival time |
====================================================================================================
AL-666                 | Alitalia               | LHR                    | 06:00                  |
----------------------------------------------------------------------------------------------------
BA-12345               | British Airways        | LHR                    | 21:47                  |
----------------------------------------------------------------------------------------------------
REPORT
      # binding.pry
      @report.make_report.must_equal(expected) 

    end
  end

  describe "TextReport Eta sort" do
    before do
      @report = TextReport.new(headings: ["Flight No.", "Airline", "From", "Estimated Arrival Time"],
      rows: [["BA-12345", "British Airways", "LHR", "21:47"], ["AL-666", "Alitalia", "LHR", "22:00"]],
      sort_strategy: EtaSort.new(sorting_order: :asc))
    end

    it "should display the flight list in text format sorted by Eta, ascending" do
      expected = <<-REPORT
====================================================================================================
Flight No              | Airline                | From                   | Estimated arrival time |
====================================================================================================
BA-12345               | British Airways        | LHR                    | 21:47                  |
----------------------------------------------------------------------------------------------------
AL-666                 | Alitalia               | LHR                    | 22:00                  |
----------------------------------------------------------------------------------------------------
REPORT
      # binding.pry
      @report.make_report.must_equal(expected)      
    end
  end


  describe HtmlReport do
    before do
      @report = HtmlReport.new(headings: ["Flight No.", "Airline", "From", "Estimated Arrival Time"],
        rows: [["BA-12345", "British Airways", "LHR", "21:47"], ["AL-666", "Alitalia", "LHR", "06:00"]],
        sort_strategy: EtaSort.new(sorting_order: :asc))
    end
    

    it "should display the flight list in html format" do
      expected = <<-REPORT
<!DOCTYPE html>
<html>
  <body>
    <table>
      <thead>
        <tr>
          <th>Flight No.</th>
          <th>Airline</th>
          <th>From</th>
          <th>Estimated Arrival Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>BA-12345</td>
          <td>British Airways</td>
          <td>LHR</td>
          <td>21:47</td>
        </tr>
        <tr>
          <td>AL-666</td>
          <td>Alitalia</td>
          <td>LHR</td>
          <td>06:00</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
REPORT

      puts @report.make_report
      expected.each_line.with_index do |line, index|
        line.strip.must_equal @report.make_report.lines[index].strip
      end
    end
  end
end