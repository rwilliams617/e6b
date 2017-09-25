require './lib/flight'

ba_12345 = Flight.new(
  :number => 'BA-12345',
  :airline => 'British Airways',
  :from => "LHR",
  :from_lat => 51.4700223,
  :from_lng => -0.4542955,
  :to => "JFK",
  :to_lat => 40.6413111,
  :to_lng => -73.77813909999999,
  :departure => Time.utc(2014, 11, 1, 14, 47),
  :speed_kph => 790,
  :bearing => 3,
  :aircraft => "Boeing 747"
)

# Find the estimated flight time- e.g. If an aircraft is flying at a speed of per hour, how long will it take to fly  miles?
earth_radius_km = 6371

# Convert the lat / lng from the from / to airports into radians
from_lat_radians = ba_12345.from_lat * Math::PI / 180
from_lng_radians = ba_12345.from_lng * Math::PI / 180
to_lat_radians = ba_12345.to_lat * Math::PI / 180
to_lng_radians = ba_12345.to_lng * Math::PI / 180

# Calculate the distance between the start and end airports
cosines_product = Math.cos(to_lat_radians) * Math.cos(from_lat_radians) * Math.cos(from_lng_radians - to_lng_radians)
sines_product = Math.sin(to_lat_radians) * Math.sin(from_lat_radians)
distance = earth_radius_km * Math.acos(cosines_product + sines_product)

# Calculate the flight time
speed = ba_12345.speed_kph
hours = (distance / speed).round
minutes = distance.remainder(speed).round
puts "Estimated Flight Time for #{ba_12345.number}: #{hours} hours #{minutes} minutes"

