import { useState, useEffect, useCallback } from 'react';
import { axiosReq } from '../api/axiosDefaults';

// Generic fetch function
const fetchData = async (endpoint) => {
  try {
    const { data } = await axiosReq.get(endpoint);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
};

// Base hook factory
const createDataHook = (endpoint, options = {}) => {
  return (id = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchResourceData = useCallback(async () => {
      setLoading(true);
      const url = id ? `${endpoint}/${id}/` : endpoint;
      const { data: responseData, error: responseError } = await fetchData(url);
      
      if (responseError) {
        setError(responseError);
      } else {
        setData(responseData);
      }
      setLoading(false);
    }, [id]);

    useEffect(() => {
      fetchResourceData();
    }, [fetchResourceData]);

    const refetch = () => fetchResourceData();

    return { data, loading, error, refetch };
  };
};

// Specific data hooks
export const useUser = createDataHook('/dj-rest-auth/user');
export const useProfile = createDataHook('/profiles');
export const useCity = createDataHook('/cities');
export const useEvent = createDataHook('/events');
export const useClub = createDataHook('/clubs');
export const useRunUp = createDataHook('/runups');

// Combined hooks for related data
export const useUserWithProfile = () => {
  const { data: user, loading: userLoading, error: userError } = useUser();
  const { data: profile, loading: profileLoading, error: profileError } = useProfile(user?.pk);

  return {
    user,
    profile,
    loading: userLoading || profileLoading,
    error: userError || profileError,
  };
};

// Hook for city-related data
export const useCityData = (cityId) => {
  const { data: city, loading: cityLoading } = useCity(cityId);
  const { data: events, loading: eventsLoading } = useEvent();
  const { data: clubs, loading: clubsLoading } = useClub();
  const { data: runUps, loading: runUpsLoading } = useRunUp();

  const filteredData = {
    city,
    events: events?.filter(event => event.city_id === cityId),
    clubs: clubs?.filter(club => club.city_id === cityId),
    runUps: runUps?.filter(runUp => runUp.city_id === cityId),
  };

  return {
    data: filteredData,
    loading: cityLoading || eventsLoading || clubsLoading || runUpsLoading,
  };
};

// Hook for user-related activities
export const useUserActivities = (userId) => {
  const { data: userFollows } = createDataHook('/user-follows')(userId);
  const { data: clubFollows } = createDataHook('/club-follows')(userId);
  const { data: participatedEvents } = createDataHook('/participated-events')(userId);
  const { data: createdRunUps } = createDataHook('/runups')(userId);

  return {
    following: userFollows?.map(follow => follow.followed_id) || [],
    clubsFollowing: clubFollows?.map(follow => follow.club_id) || [],
    events: participatedEvents || [],
    runUps: createdRunUps || [],
  };
};

// Example usage of relationship checking
export const useRelationships = () => {
  return {
    isFollowing: async (userId, targetId) => {
      const { data } = await fetchData(`/user-follows/?user_id=${userId}&followed_id=${targetId}`);
      return data?.length > 0;
    },
    isClubMember: async (userId, clubId) => {
      const { data } = await fetchData(`/club-follows/?user_id=${userId}&club_id=${clubId}`);
      return data?.length > 0;
    },
    isEventParticipant: async (userId, eventId) => {
      const { data } = await fetchData(`/event-participants/?user_id=${userId}&event_id=${eventId}`);
      return data?.length > 0;
    },
  };
};