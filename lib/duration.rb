Duration = Struct.new(:seconds) do

	SECONDS_IN_AN_HOUR = 3600

def hours
	(seconds / SECONDS_IN_AN_HOUR).round
end

def minutes
	seconds.remainder(SECONDS_IN_AN_HOUR) / 60
end

end