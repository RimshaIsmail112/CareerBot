"use client";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { FaStar, FaUser, FaChartBar } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { HOST } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

function RatingsDashboard() {
  const [ratingsData, setRatingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processedData, setProcessedData] = useState([]);
  const [overallStats, setOverallStats] = useState({});

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  const RATING_COLORS = {
    5: '#10B981', // Green for excellent
    4: '#3B82F6', // Blue for very good
    3: '#F59E0B', // Yellow for good
    2: '#F97316', // Orange for fair
    1: '#EF4444'  // Red for poor
  };

  useEffect(() => {
    fetchRatingsData();
  }, []);

  const fetchRatingsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${HOST || 'http://localhost:5000'}/get-ratings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setRatingsData(result.data);
      processRatingsData(result.data);
    } catch (error) {
      console.error("Error fetching ratings data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const processRatingsData = (data) => {
    const processed = data.map(candidate => {
      const ratings = candidate.ratings.map(r => parseInt(r.rating));
      const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
      
      // Count ratings distribution
      const distribution = {
        5: ratings.filter(r => r === 5).length,
        4: ratings.filter(r => r === 4).length,
        3: ratings.filter(r => r === 3).length,
        2: ratings.filter(r => r === 2).length,
        1: ratings.filter(r => r === 1).length,
      };

      return {
        ...candidate,
        average: parseFloat(average.toFixed(2)),
        totalRatings: ratings.length,
        ratings: ratings,
        distribution
      };
    });

    // Sort by average rating (highest first)
    processed.sort((a, b) => b.average - a.average);
    setProcessedData(processed);

    // Calculate overall statistics
    const allRatings = processed.flatMap(p => p.ratings);
    const overallAverage = allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;
    const totalCandidates = processed.length;
    const totalRatings = allRatings.length;
    
    const overallDistribution = {
      5: allRatings.filter(r => r === 5).length,
      4: allRatings.filter(r => r === 4).length,
      3: allRatings.filter(r => r === 3).length,
      2: allRatings.filter(r => r === 2).length,
      1: allRatings.filter(r => r === 1).length,
    };

    setOverallStats({
      overallAverage: parseFloat(overallAverage.toFixed(2) || 0),
      totalCandidates,
      totalRatings,
      distribution: overallDistribution
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'} w-4 h-4`}
      />
    ));
  };

  const getRatingLabel = (rating) => {
    const labels = {
      5: 'Excellent',
      4: 'Very Good',
      3: 'Good',
      2: 'Fair',
      1: 'Poor'
    };
    return labels[Math.round(rating)] || 'N/A';
  };

  const pieChartData = Object.entries(overallStats.distribution || {})
    .map(([rating, count]) => ({
      name: `${rating} Stars`,
      value: count,
      rating: parseInt(rating)
    }))
    .filter(item => item.value > 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ImSpinner2 size={50} className="animate-spin text-slate-950" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h2>
          <p className="text-slate-700">{error}</p>
          <button
            onClick={fetchRatingsData}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Candidate Ratings Dashboard
          </h1>
          <p className="text-slate-300 text-lg">
            Comprehensive overview of candidate performance ratings
          </p>
        </div>

        {/* Overall Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Overall Average</p>
                <p className="text-3xl font-bold text-slate-950">
                  {overallStats.overallAverage || 0}
                </p>
              </div>
              <div className="flex">
                {renderStars(overallStats.overallAverage || 0)}
              </div>
            </div>
            <p className="text-slate-500 text-sm mt-2">
              {getRatingLabel(overallStats.overallAverage || 0)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Candidates</p>
                <p className="text-3xl font-bold text-blue-600">
                  {overallStats.totalCandidates || 0}
                </p>
              </div>
              <FaUser className="text-blue-500 w-8 h-8" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Ratings</p>
                <p className="text-3xl font-bold text-green-600">
                  {overallStats.totalRatings || 0}
                </p>
              </div>
              <FaChartBar className="text-green-500 w-8 h-8" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Avg per Candidate</p>
                <p className="text-3xl font-bold text-purple-600">
                  {overallStats.totalCandidates ? 
                    Math.round(overallStats.totalRatings / overallStats.totalCandidates * 10) / 10 : 0}
                </p>
              </div>
              <FaStar className="text-purple-500 w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Ratings Distribution - Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-slate-950 mb-4">
              Overall Ratings Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={RATING_COLORS[entry.rating]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Average Ratings by Candidate - Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-slate-950 mb-4">
              Average Ratings by Candidate
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processedData.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="candidateEmail" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={10}
                />
                <YAxis domain={[0, 5]} />
                <Tooltip 
                  formatter={(value) => [value, 'Average Rating']}
                  labelFormatter={(label) => `Email: ${label}`}
                />
                <Bar dataKey="average" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Individual Candidate Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Individual Candidate Ratings</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {processedData.map((candidate, index) => (
              <div key={candidate._id} className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-950 truncate max-w-[200px]">
                        {candidate.candidateEmail}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {candidate.totalRatings} rating{candidate.totalRatings !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl font-bold text-slate-950">
                        {candidate.average}
                      </span>
                      <div className="flex">
                        {renderStars(candidate.average)}
                      </div>
                    </div>
                    <Badge className="bg-slate-900 text-slate-50">
                      {getRatingLabel(candidate.average)}
                    </Badge>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700 text-sm">Rating Distribution:</h4>
                  <div className="grid grid-cols-5 gap-2 text-sm">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <FaStar className={`w-3 h-3 ${RATING_COLORS[rating] === '#10B981' ? 'text-green-500' : 
                            RATING_COLORS[rating] === '#3B82F6' ? 'text-blue-500' :
                            RATING_COLORS[rating] === '#F59E0B' ? 'text-yellow-500' :
                            RATING_COLORS[rating] === '#F97316' ? 'text-orange-500' : 'text-red-500'}`} />
                          <span className="ml-1 font-medium">{rating}</span>
                        </div>
                        <div className="text-slate-600 font-semibold">
                          {candidate.distribution[rating]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Ratings */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h4 className="font-medium text-slate-700 text-sm mb-2">Individual Ratings:</h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.ratings.map((rating, ratingIndex) => (
                      <Badge
                        key={ratingIndex}
                        className={`${
                          rating === 5 ? 'bg-green-500' :
                          rating === 4 ? 'bg-blue-500' :
                          rating === 3 ? 'bg-yellow-500' :
                          rating === 2 ? 'bg-orange-500' : 'bg-red-500'
                        } text-white`}
                      >
                        {rating}★
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {processedData.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-600 mb-4">No Ratings Data Available</h3>
            <p className="text-slate-500">No candidate ratings have been submitted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RatingsDashboard;